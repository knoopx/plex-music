//

import { hot } from 'react-hot-loader'
import React from 'react'
import { inject, observer } from 'mobx-react'
import { LoadingSlate, Transition } from 'ui'
import { LoginView, DeviceListView, PlayerView } from './views'
import Spinner from '../ui/spinner'

@hot(module)
@inject('store')
@observer
class App extends React.Component {
  getView(route) {
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
    return (
      <div className="flex flex-row h-screen bg-white">
        <Transition name={route}>
          {this.getView(route)}
        </Transition>
      </div>
    )
  }
}

@inject('store')
@observer
export default class Container extends React.Component {
  render() {
    const { store } = this.props
    return (
      <App />
    )
  }
}
