import React from "react"
import { inject, observer } from "mobx-react"

import { Text } from "ui"

import SeekBar from "./seek-bar"
import PlaybackButtons from "./playback-buttons"

const formatDuration = (input = 0) => {
  const z = (n) => (n < 10 ? "0" : "") + n
  return `${z(Math.floor(input / 60))}:${z(Math.floor(input % 60))}`
}

const PlayerView = (props) => {
  const { store } = props
  return (
    <div className="flex flex-auto items-center">
      <div className="flex flex-auto items-center">
        <Text className="mx-4">
          {formatDuration(store.playbackStore.currentTime)}
        </Text>
        <SeekBar
          key={
            store.playbackStore.activeItem && store.playbackStore.activeItem.id
          }
        />
        <Text className="mx-4">
          {formatDuration(store.playbackStore.duration)}
        </Text>
      </div>
      <PlaybackButtons />
    </div>
  )
}

export default inject("store")(observer(PlayerView))
