// @flow

import { observable, computed, action } from 'mobx'

import { build } from 'app/themes/base'
import { getItem, setItem } from 'support/storage'
import Connection from 'stores/connection'
import AlbumStore from 'stores/album-store'

import Device from '../account/device'

export default class AppState {
  @observable accentColor = getItem('accentColor', '#0f6cd5')
  @observable baseColor = getItem('baseColor', '#fff')
  @observable isConnecting: boolean = false;
  @observable connection: ?Connection;
  @observable albumStore: ?AlbumStore;

  @action setAccentColor(value: string) {
    this.accentColor = value
  }

  @action setBaseColor(value: string) {
    console.log(value)
    this.baseColor = value
  }

  @computed get theme(): mixed {
    return build(this.accentColor, this.baseColor)
  }

  @action connect(device: Device): void {
    this.isConnecting = true
    try {
      this.connection = new Connection(device)
      this.albumStore = new AlbumStore(this.connection)
    } catch (e) {
      this.disconnect()
      throw e
    } finally {
      this.isConnecting = false
    }
  }

  @action disconnect(): void {
    this.connection = null
  }

  @computed get isConnected(): boolean {
    return !!this.connection
  }
}
