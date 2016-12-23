// @flow

import React from 'react'
import { inject, observer, Provider } from 'mobx-react'
import { autobind } from 'core-decorators'

import { AppState, AlbumStore } from 'stores'
import { LoadingSlate } from 'ui'

import LoginScreen from './login-screen'
import PlayerScreen from './player-screen'
import DeviceListScreen from './device-list-screen'

@inject('account')
@inject('appState')
@autobind
@observer
export default class MainScreen extends React.Component {
  props: {
    appState: AppState
  }

  render() {
    const { appState, account } = this.props

    if (appState.isConnecting || account.isLoggingIn) {
      return <LoadingSlate />
    }

    if (appState.isConnected) {
      return (
        <Provider albumStore={new AlbumStore(appState.connection)}>
          <PlayerScreen />
        </Provider>
      )
    }

    if (account.isLoggedIn) {
      return <DeviceListScreen />
    }

    return <LoginScreen />
  }
}
