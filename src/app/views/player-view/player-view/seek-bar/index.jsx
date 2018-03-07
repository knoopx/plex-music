import React from 'react'

import { inject, observer } from 'mobx-react'
import { theme } from 'ui/theming'
import { Frame } from 'ui'
import styles from './seek-bar.css'

@theme('seekBar')
@inject('playQueue')
@observer
export default class SeekBar extends React.Component {
  onSeek(e) {
    this.props.playQueue.seekTo(e.nativeEvent.offsetX /
        e.target.clientWidth *
        this.props.playQueue.duration)
  }

  renderLoader() {
    return (
      <div style={{ flex: 1, margin: 3, height: 20 }} onClick={this.onSeek}>
        <div className={styles.loader} style={this.props.bufferBarStyle} />
      </div>
    )
  }

  renderProgress() {
    const { playQueue, style, progressBarStyle, bufferBarStyle } = this.props
    const { currentTime, buffered, duration } = playQueue

    return (
      <div
        style={{
          flex: 1,
          margin: 3,
          height: 20,
          position: 'relative',
          borderRadius: 1,
          overflow: 'hidden',
        }}
        onClick={this.onSeek}
      >
        <div
          className={styles.bar}
          style={{ ...bufferBarStyle, width: `${buffered / duration * 100}%` }}
        />
        <div
          className={styles.bar}
          style={{
            ...progressBarStyle,
            width: `${currentTime / duration * 100}%`,
          }}
        />
      </div>
    )
  }

  render() {
    const { playQueue } = this.props

    return (
      <Frame style={{ flex: 1 }}>
        {playQueue.isLoading ? this.renderLoader() : this.renderProgress()}
      </Frame>
    )
  }
}
