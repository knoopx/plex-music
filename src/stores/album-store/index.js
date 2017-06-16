// @flow

import _ from 'lodash'
import mousetrap from 'mousetrap'

import { observable, computed, autorunAsync, action, IObservableArray, toJS } from 'mobx'
import { Album } from 'models'
import { getItem, setItem } from 'support/storage'

import AppState from 'stores/app-state'
import Connection from 'stores/connection'
import { OrderFn, match } from './support'
import type { FilterSet, OrderType } from './types'

export default class AlbumStore {
  appState: AppState;
  @observable isLoading: boolean = false;
  @observable isFiltering: boolean = false;
  @observable albums: IObservableArray<Album> = observable.array();
  @observable matches: IObservableArray<Album> = observable.array();

  @observable query: string = getItem('query', '');
  @observable order: OrderType = getItem('order', Object.keys(OrderFn)[0]);

  constructor(appState: AppState) {
    this.appState = appState

    autorunAsync(() => {
      setItem('query', this.query)
      setItem('order', this.order)
    }, 500)

    autorunAsync(() => {
      const order = OrderFn[this.order]
      const filterSet = this.filterSet
      const albums = toJS(this.albums)

      this.setIsFiltering(true)
      setImmediate(() => {
        this.setMatches(albums.filter(row => match(row, filterSet)).sort(order))
        this.setIsFiltering(false)
      })
    }, 200)

    autorunAsync(this.serialize)

    Object.keys(OrderFn).forEach((order, i) => {
      mousetrap.bind(`command+${i + 1}`, () => this.setOrder(order))
    })

    this.deserialize()
  }

  get connection(): Connection {
    return this.appState.connection
  }

  get sectionAlbumsKey() {
    if (this.appState.sectionKey) {
      return `${this.appState.sectionKey}:albums`
    }
  }

  @action deserialize() {
    if (this.appState.sectionKey) {
      this.setAlbums(getItem(this.sectionAlbumsKey, []).map(a => new Album(this.connection, a)))
    }
  }

  serialize() {
    if (this.appState.sectionKey) {
      setItem(this.sectionAlbumsKey, this.albums.map(({ connection, ...props }) => props))
    }
  }

  @action async fetch(displaySpinner: boolean = this.albums.length === 0) {
    this.setIsLoading(displaySpinner)
    try {
      this.setAlbums(await this.appState.connection.albums.findAll(this.appState.section))
    } finally {
      this.setIsLoading(false)
    }
  }

  @action setIsFiltering(value: boolean) {
    this.isFiltering = value
  }

  @action setIsLoading(value: boolean) {
    this.isLoading = value
  }

  @action setMatches(albums: Array<Album>) {
    this.matches.replace(albums)
  }

  @action setAlbums(albums: Array<Album>) {
    this.albums.replace(albums)
  }

  @action clearFilter() {
    this.setQuery('')
  }

  @action setQuery(text: string) {
    this.query = text
  }

  @action setOrder(value: OrderType) {
    this.order = value
  }

  @computed get filterSet(): FilterSet {
    const predicates = {}
    const query = _.reduce([/(\w+):(\w+)/g, /(\w+):"([^"]+)"/g, /(\w+):'([^']+)'/g], (_query, regex) => (
      _query.replace(regex, (__, key, value) => {
        predicates[key] = value
        return ''
      })
    ), this.query)

    return { query: query.trim(), ...predicates }
  }
}
