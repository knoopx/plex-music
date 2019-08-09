import React from "react"
import { inject, observer } from "mobx-react"

import { LoadingSlate, Transition } from "ui"

import NowPlaying from "./now-playing"
import PlayList from "./play-list"

const PlaylistView = (props) => {
  const { playbackStore } = props

  const renderContent = () => {
    if (playbackStore.isFetching) {
      return <LoadingSlate />
    }

    return (
      <div className="flex flex-auto flex-col">
        {playbackStore.activeItem && (
          <NowPlaying activeItem={playbackStore.activeItem} />
        )}
        <PlayList items={playbackStore.playlist} />
      </div>
    )
  }

  return (
    <Transition name={playbackStore.isFetching ? "loading" : "ready"}>
      {renderContent()}
    </Transition>
  )
}

export default inject((stores) => ({
  playbackStore: stores.store.playbackStore,
}))(observer(PlaylistView))
