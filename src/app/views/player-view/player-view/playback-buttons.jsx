import React from "react"
import { inject, observer } from "mobx-react"
import { FaFastForward, FaFastBackward, FaPlay, FaPause } from "react-icons/fa"

import { Button, ButtonGroup } from "ui"

const PlaybackButtons = (props) => {
  const { store } = props

  return (
    <ButtonGroup>
      <Button
        style={{ width: 48, height: 34 }}
        onClick={() => store.playbackStore.playPrev()}
      >
        <FaFastBackward />
      </Button>
      <Button
        style={{ width: 48, height: 34 }}
        onClick={() => store.playbackStore.toggle()}
      >
        {store.playbackStore.isPlaying ? <FaPause /> : <FaPlay />}
      </Button>
      <Button
        style={{ width: 48, height: 34 }}
        onClick={() => store.playbackStore.playNext()}
      >
        {" "}
        <FaFastForward />{" "}
      </Button>
    </ButtonGroup>
  )
}

export default inject("store")(observer(PlaybackButtons))
