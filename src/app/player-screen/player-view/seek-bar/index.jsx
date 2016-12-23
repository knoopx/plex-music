import React from 'react'
import { autobind } from 'core-decorators'
import { inject, observer } from 'mobx-react'

import styles from './seek-bar.css'

@inject('theme')
@inject('playQueue')
@autobind
@observer
export default class SeekBar extends React.Component {
  onSeek(e) {
    this.props.playQueue.seekTo(e.nativeEvent.offsetX / e.target.clientWidth * this.props.playQueue.duration)
  }

  renderLoader() {
    return (
      <div style={{ flex: 1, margin: 3, height: 20 }} onClick={this.onSeek}>
        <div className={styles.loader} style={{ backgroundColor: this.props.theme.secondaryBackgroundColor }} />
      </div>
    )
  }

  renderProgress() {
    const { playQueue, theme } = this.props
    const { currentTime, buffered, duration } = playQueue

    return (
      <div style={{ flex: 1, margin: 3, height: 20, position: 'relative' }} onClick={this.onSeek}>
        <div className={styles.bar} style={{ backgroundColor: theme.secondaryBackgroundColor, width: `${buffered / duration * 100}%` }} />
        <div className={styles.bar} style={{ backgroundColor: theme.primaryColor, width: `${currentTime / duration * 100}%` }} />
      </div>
    )
  }

  render() {
    const { playQueue } = this.props

    return (
      <div className={styles.default}>
        {playQueue.isLoading ? this.renderLoader() : this.renderProgress()}
      </div>
    )
  }
}
