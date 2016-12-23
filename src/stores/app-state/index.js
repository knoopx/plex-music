// @flow

import { observable, computed, action } from 'mobx'

import Connection from 'stores/connection'
import Device from '../account/device'

export default class AppState {
  @observable isConnecting: boolean = false;
  @observable connection: ?Connection;

  @action connect(device: Device): void {
    this.isConnecting = true
    try {
      this.connection = new Connection(device)
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
