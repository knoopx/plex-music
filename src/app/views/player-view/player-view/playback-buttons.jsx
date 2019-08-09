import React from "react"
import { inject, observer } from "mobx-react"
import {
  MdFastForward,
  MdFastRewind,
  MdPlayArrow,
  MdPause,
} from "react-icons/md"

import { Button, ButtonGroup } from "ui"

const PlaybackButtons = ({ store }) => {
  return (
    <ButtonGroup>
      <Button
        style={{ width: 48, height: 34 }}
        onClick={() => store.playbackStore.playPrev()}
      >
        <MdFastRewind size={18} />
      </Button>
      <Button
        style={{ width: 48, height: 34 }}
        onClick={() => store.playbackStore.toggle()}
      >
        {store.playbackStore.isPlaying ? (
          <MdPause size={18} />
        ) : (
          <MdPlayArrow size={18} />
        )}
      </Button>
      <Button
        style={{ width: 48, height: 34 }}
        onClick={() => store.playbackStore.playNext()}
      >
        <MdFastForward size={18} />
      </Button>
    </ButtonGroup>
  )
}

export default inject("store")(observer(PlaybackButtons))
