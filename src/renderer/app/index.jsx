//

import { hot } from "react-hot-loader"
import React from "react"
import { inject, observer } from "mobx-react"

import { LoadingSlate, Transition } from "ui"

import Spinner from "../ui/spinner"

import { LoginView, DeviceListView, PlayerView } from "./views"

const App = (props) => {
  const { store } = props

  const getCurrentRoute = () => {
    if (store.isConnecting || store.account.isLoggingIn) {
      return "loading"
    }

    if (store.activeDevice) {
      return "player"
    }

    if (store.account.isLoggedIn) {
      return "deviceList"
    }

    return "login"
  }

  const route = getCurrentRoute()

  const getView = () => {
    switch (route) {
      case "loading":
        return <LoadingSlate />
      case "player":
        return <PlayerView />
      case "deviceList":
        return <DeviceListView />
      default:
        return <LoginView />
    }
  }

  return (
    <div className="bg-white flex flex-row h-screen">
      <Transition name={route}>{getView(route)}</Transition>
    </div>
  )
}

export default hot(module)(inject("store")(observer(App)))
