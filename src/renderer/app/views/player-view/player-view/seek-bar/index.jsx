import React from "react"
import { inject, observer } from "mobx-react"

const SeekBar = (props) => {
  const onSeek = (e) => {
    props.store.playbackStore.seekTo(
      (e.nativeEvent.offsetX / e.target.clientWidth) *
        props.store.playbackStore.duration,
    )
  }

  const renderLoader = () => {
    return (
      <div style={{ flex: 1, margin: 3, height: 20 }} onClick={onSeek}>
        <div className="seek-bar-loader" />
      </div>
    )
  }

  const renderProgress = () => {
    const { store } = props
    const { currentTime, buffered, duration } = store.playbackStore

    return (
      <div
        style={{
          flex: 1,
          margin: 3,
          height: 20,
          position: "relative",
          borderRadius: 1,
          overflow: "hidden",
        }}
        onClick={onSeek}
      >
        <div
          className="seek-bar"
          style={{ width: `${(buffered / duration) * 100}%` }}
        />
        <div
          className="seek-bar"
          style={{ width: `${(currentTime / duration) * 100}%` }}
        />
      </div>
    )
  }

  return (
    <div className="flex-auto bg-white frame" {...props}>
      {props.store.playbackStore.isLoading ? renderLoader() : renderProgress()}
    </div>
  )
}

export default inject("store")(observer(SeekBar))
