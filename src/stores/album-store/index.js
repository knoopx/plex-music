// @flow

import _ from 'lodash'
import mousetrap from 'mousetrap'
import { autobind } from 'core-decorators'
import { observable, computed, autorunAsync, action, IObservableArray } from 'mobx'
import { Album } from 'models'
import { getItem, setItem } from 'support/storage'

import Connection from 'stores/connection'
import { OrderFn, match } from './support'
import type { FilterSet, OrderType } from './types'

@autobind
export default class AlbumStore {
  connection: Connection;
  @observable isLoading: boolean = false;
  @observable isFiltering: boolean = false;
  @observable albums: IObservableArray<Album> = [];
  @observable matches: IObservableArray<Album> = [];

  @observable query: string = getItem('query', '');
  @observable order: OrderType = getItem('order', Object.keys(OrderFn)[0]);

  constructor(connection: Connection) {
    this.connection = connection

    autorunAsync(() => {
      setItem('query', this.query)
      setItem('order', this.order)
    }, 500)

    autorunAsync(() => {
      const order = OrderFn[this.order]
      const filterSet = this.filterSet
      const albums = this.albums.toJS()

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
    this.fetch()
  }

  @action deserialize() {
    this.setAlbums(getItem(this.connection.device.clientIdentifier, []).map(a => new Album(this.connection, a)))
  }

  serialize() {
    setItem(this.connection.device.clientIdentifier, this.albums.map(({ connection, ...props }) => props))
  }

  @action async fetch(displaySpinner = this.albums.length === 0) {
    this.setIsLoading(displaySpinner)
    try {
      this.setAlbums(await this.connection.albums.findAll())
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
