// @flow

import React from 'react'
import { inject, observer, Provider } from 'mobx-react'

import { ThemeProvider, theme } from 'react-theme'

import { AppState, Account } from 'stores'
import { LoadingSlate, Transition, View } from 'ui'

import { LoginView, DeviceListView, PlayerView } from './views'

@theme('app')
@inject('account')
@inject('appState')

@observer
class App extends React.Component {
  props: {
    style: {},
    appState: AppState,
    account: Account
  }

  getView(route: string) {
    const { appState } = this.props

    switch (route) {
      case 'loading':
        return <LoadingSlate />
      case 'player':
        return (
          <Provider albumStore={appState.albumStore}>
            <PlayerView />
          </Provider>
        )
      case 'deviceList':
        return <DeviceListView />

      default:
        return <LoginView />
    }
  }

  getCurrentRoute() {
    const { appState, account } = this.props

    if (appState.isConnecting || account.isLoggingIn) {
      return 'loading'
    }

    if (appState.isConnected) {
      return 'player'
    }

    if (account.isLoggedIn) {
      return 'deviceList'
    }

    return 'login'
  }

  render() {
    const route = this.getCurrentRoute()
    const { style } = this.props
    return (
      <View flow="row" style={{ flex: 1, ...style }}>
        <Transition name={route}>{this.getView(route)}</Transition>
      </View>
    )
  }
}

@inject('appState')
@observer
export default class Container extends React.Component {
  render() {
    const { appState } = this.props
    return <ThemeProvider theme={appState.theme} ><App /></ThemeProvider>
  }
}
