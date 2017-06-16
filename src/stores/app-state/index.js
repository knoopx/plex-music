// @flow

import { observable, computed, action, autorun, autorunAsync, IObservableArray } from 'mobx'

import * as themes from 'app/themes'
import { getItem, setItem } from 'support/storage'
import { Section } from 'models'
import Connection from 'stores/connection'
import AlbumStore from 'stores/album-store'

import Device from '../account/device'

export default class AppState {
  @observable themeName = getItem('theme', Object.keys(themes)[0])
  @observable isConnected: boolean = false;
  @observable isConnecting: boolean = false;
  @observable connection: ?Connection;
  @observable albumStore: ?AlbumStore;
  @observable sections: IObservableArray<Section> = observable.array()
  @observable activeSectionIndex: number = 0;

  albumStore = new AlbumStore(this)

  @computed get section(): ?Section {
    return this.sections[this.activeSectionIndex]
  }

  constructor() {
    this.deserialize()

    autorun(() => {
      if (this.albumStore && this.section) {
        this.albumStore.fetch(true)
      }
    })

    autorunAsync(this.serialize)
  }

  @action setThemeName(value: string) {
    if (themes[this.themeName]) {
      this.themeName = value
      setItem('theme', value)
    }
  }

  @computed get theme(): mixed {
    return themes[this.themeName]
  }

  @action onChangeSection(e: SyntheticInputEvent) {
    this.activeSectionIndex = Number(e.target.value)
  }

  @action async connect(device: Device): Promise<void> {
    this.setIsConnecting(true)
    try {
      this.setConnection(new Connection(device))
      this.setSections(await this.connection.getArtistSections())
      this.setIsConnected(true)
    } catch (e) {
      this.setIsConnected(false)
      throw e
    } finally {
      this.setIsConnecting(false)
    }
  }

  get deviceKey(): ?string {
    if (this.connection && this.connection.device) {
      return ['device', this.connection.device.clientIdentifier].join(':')
    }
  }

  get sectionKey(): ?string {
    if (this.deviceKey && this.section) {
      return [this.deviceKey, 'section', this.section.id].join(':')
    }
  }

  get activeSectionIndexKey(): ?string {
    if (this.deviceKey) {
      return `${this.deviceKey}:activeSectionIndex`
    }
  }

  serialize() {
    if (this.activeSectionIndexKey) {
      setItem(this.activeSectionIndexKey, this.activeSectionIndex)
    }
  }

  @action deserialize() {
    this.activeSectionIndex = getItem(this.activeSectionIndexKey, 0)
  }

  @action setSections(sections: Array<Section>) {
    this.sections = sections
  }

  @action setConnection(connection: Connection) {
    this.connection = connection
  }

  @action setIsConnecting(value: boolean): void {
    this.isConnecting = value
  }
  @action setIsConnected(value: boolean): void {
    this.isConnected = value
  }

  @action disconnect() {
    this.setIsConnected(false)
  }
}
