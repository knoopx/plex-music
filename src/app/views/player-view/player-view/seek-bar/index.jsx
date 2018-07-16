import React from 'react'

import { inject, observer } from 'mobx-react'
import { Frame } from 'ui'
import styles from './seek-bar.css'

@inject('store')
@observer
export default class SeekBar extends React.Component {
  onSeek(e) {
    this.props.store.playbackStore.seekTo(e.nativeEvent.offsetX / e.target.clientWidth * this.props.store.playbackStore.duration)
  }

  renderLoader() {
    return (
      <div style={{ flex: 1, margin: 3, height: 20 }} onClick={this.onSeek}>
        <div className={styles.loader} style={this.props.bufferBarStyle} />
      </div>
    )
  }

  renderProgress() {
    const { store, style, progressBarStyle, bufferBarStyle } = this.props
    const { currentTime, buffered, duration } = store.playbackStore

    return (
      <div
        style={{ flex: 1, margin: 3, height: 20, position: 'relative', borderRadius: 1, overflow: 'hidden' }}
        onClick={this.onSeek}
      >
        <div className={styles.bar} style={{ ...bufferBarStyle, width: `${buffered / duration * 100}%` }} />
        <div className={styles.bar} style={{ ...progressBarStyle, width: `${currentTime / duration * 100}%` }} />
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
