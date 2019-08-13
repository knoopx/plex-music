import React from "react"
import { inject, observer } from "mobx-react"

import { LoadingSlate, Transition } from "ui"

import AlbumList from "./album-list"

const AlbumListView = (props) => {
  const { store } = props

  const renderContent = () => {
    if (store.albumStore.isLoading) {
      return <LoadingSlate />
    }
    return <AlbumList albums={store.albumStore.matches} />
  }

  return (
    <Transition name={store.albumStore.isLoading ? "loading" : "ready"}>
      {renderContent()}
    </Transition>
  )
}

export default inject("store")(observer(AlbumListView))
