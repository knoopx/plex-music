// @flow

import Axios from 'axios'
import UUID from 'uuid'
import { flow, filter, map } from 'lodash/fp'
import { observable, action } from 'mobx'
import { AppState } from 'stores'
import { getItem, setItem } from 'support/storage'

import Device from './device'
import type { LoginParams } from './types'

export default class Account {
  appState: AppState;
  @observable devices: Array<Device>;
  @observable loginParams: LoginParams;
  @observable isLoggedIn: boolean = false;
  @observable isLoggingIn: boolean = false;

  constructor(appState: AppState) {
    this.appState = appState
    const loginParams = this.getLoginParams()
    if (loginParams) {
      this.login(loginParams)
    }
  }

  async login(loginParams: LoginParams): Promise<void> {
    const clientIdentifier = this.getClientIdentifier()

    this.setIsLoggingIn(true)
    try {
      const auth = await this.performLogin(loginParams, clientIdentifier)
      if (auth && auth.data && auth.data.authToken) {
        if (typeof auth.data.authToken === 'string') {
          this.setDevices(await this.fetchDevices(auth.data.authToken))
          setItem('loginParams', loginParams)
          this.setLoginParams(loginParams)
          this.setIsLoggedIn(true)

          if (this.devices.length === 1) {
            this.appState.connect(this.devices[0])
          }
        }
      }
    } finally {
      this.setIsLoggingIn(false)
    }
  }

  @action logOut() {
    this.setLoginParams({})
    this.setDevices([])
    this.setIsLoggedIn(false)
    localStorage.removeItem('loginParams')
  }

  @action setLoginParams(loginParams: LoginParams) {
    this.loginParams = loginParams
  }

  @action setDevices(devices: Array<Device>) {
    this.devices = devices
  }

  @action setIsLoggingIn(value: boolean) {
    this.isLoggingIn = value
  }

  @action setIsLoggedIn(value: boolean) {
    this.isLoggedIn = value
  }

  @action getLoginParams(): ?LoginParams {
    return getItem('loginParams')
  }

  @action getClientIdentifier(): string {
    const value = getItem('X-Plex-Client-Identifier')
    if (value) { return value }
    const newValue = UUID.v4()
    setItem('X-Plex-Client-Identifier', newValue)
    return newValue
  }

  async fetchDevices(authToken: string): Promise<Array<Device>> {
    const res = await Axios.get('https://plex.tv/api/resources', { params: { includeHttps: 1, includeRelay: 1, 'X-Plex-Token': authToken }, responseType: 'document' })
    return flow(map(device => Device.parse(device)), filter(d => d.presence && d.provides === 'server'))(res.data.getElementsByTagName('Device'))
  }

  async performLogin(loginParams: LoginParams, clientIdentifier: string): Promise<mixed> {
    return Axios.post('https://plex.tv/api/v2/users/signin', loginParams, {
      headers: {
        'X-Plex-Client-Identifier': clientIdentifier,
        'X-Plex-Device-Name': 'Plex Music',
        'X-Plex-Product': 'Plex Music',
        'X-Plex-Device': 'OSX',
        Accept: 'application/json',
      },
    })
  }
}
