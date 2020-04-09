import React from 'react'
import { inject, observer, Provider } from 'mobx-react'

import { ThemeProvider, theme } from 'ui/theming'

import { AppState, Account } from 'stores'
import { LoadingSlate, Transition, View } from 'ui'

import { LoginView, DeviceListView, PlayerView } from './views'

@theme('app')
@inject('account')
@inject('appState')
@observer
class App extends React.Component {
  getView(route) {
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
class Container extends React.Component {
  render() {
    const { appState } = this.props
    return (
      <ThemeProvider theme={appState.theme}>
        <App />
      </ThemeProvider>
    )
  }
}

export default Container
