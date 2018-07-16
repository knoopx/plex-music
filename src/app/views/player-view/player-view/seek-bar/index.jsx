import React from 'react'

import { inject, observer } from 'mobx-react'
import { Frame } from 'ui'

@inject('store')
@observer
export default class SeekBar extends React.Component {
  onSeek(e) {
    this.props.store.playbackStore.seekTo(e.nativeEvent.offsetX / e.target.clientWidth * this.props.store.playbackStore.duration)
  }

  renderLoader() {
    return (
      <div style={{ flex: 1, margin: 3, height: 20 }} onClick={this.onSeek}>
        <div className="seek-bar-loader" />
      </div>
    )
  }

  renderProgress() {
    const { store } = this.props
    const { currentTime, buffered, duration } = store.playbackStore

    return (
      <div
        style={{ flex: 1, margin: 3, height: 20, position: 'relative', borderRadius: 1, overflow: 'hidden' }}
        onClick={this.onSeek}
      >
        <div className="seek-bar" style={{ width: `${buffered / duration * 100}%` }} />
        <div className="seek-bar" style={{ width: `${currentTime / duration * 100}%` }} />
      </div>
    )
  }

  render() {
    const { ...props } = this.props
    return (
      <Frame {...props}>
        {this.props.store.playbackStore.isLoading ? this.renderLoader() : this.renderProgress()}
      </Frame>
    )
  }
}
