// @flow

import { observable, computed, action } from 'mobx'

import * as themes from 'app/themes'
import { getItem, setItem } from 'support/storage'
import Connection from 'stores/connection'
import AlbumStore from 'stores/album-store'

import Device from '../account/device'

export default class AppState {
  @observable themeName = getItem('theme', Object.keys(themes)[0])
  @observable isConnecting: boolean = false;
  @observable connection: ?Connection;
  @observable albumStore: ?AlbumStore;

  @action setThemeName(value: string) {
    if (themes[this.themeName]) {
      this.themeName = value
      setItem('theme', value)
    }
  }

  @computed get theme(): mixed {
    return themes[this.themeName]
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
