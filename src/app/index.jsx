// @flow

import React from 'react'
import { hot } from 'react-hot-loader'
import { inject, observer } from 'mobx-react'
import { ThemeProvider, theme } from 'ui/theming'
import { LoadingSlate, Transition, View } from 'ui'
import { LoginView, DeviceListView, PlayerView } from './views'

@hot(module)
@theme('app')
@inject('store')
@observer
class App extends React.Component {
  getView(route: string) {
    switch (route) {
      case 'loading':
        return <LoadingSlate />
      case 'player':
        return <PlayerView />
      case 'deviceList':
        return <DeviceListView />
      default:
        return <LoginView />
    }
  }

  getCurrentRoute() {
    const { store } = this.props

    if (store.isConnecting || store.account.isLoggingIn) {
      return 'loading'
    }

    if (store.activeDevice) {
      return 'player'
    }

    if (store.account.isLoggedIn) {
      return 'deviceList'
    }

    return 'login'
  }

  render() {
    const route = this.getCurrentRoute()
    const { style } = this.props
    return (
      <View flow="row" style={{ flex: 1, ...style }}>
        <Transition name={route}>
          {this.getView(route)}
        </Transition>
      </View>
    )
  }
}

@inject('store')
@observer
export default class Container extends React.Component {
  render() {
    const { store } = this.props
    return (
      <ThemeProvider theme={store.theme}>
        <App />
      </ThemeProvider>
    )
  }
}
