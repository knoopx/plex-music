// @flow
import React from 'react'
import { inject, observer } from 'mobx-react'

import { Text, View, Gutter } from 'ui'

import SeekBar from './seek-bar'
import PlaybackButtons from './playback-buttons'

function formatDuration(input: number = 0) {
  const z = n => ((n < 10 ? '0' : '')) + n
  return `${z(Math.floor(input / 60))}:${z(Math.floor(input % 60))}`
}

@inject('playQueue')
@observer
export default class PlayerView extends React.PureComponent {
  render() {
    const { playQueue } = this.props
    return (
      <View flow="row" style={{ flex: 1, alignItems: 'center' }}>
        <View flow="row" style={{ flex: 1, alignItems: 'center' }}>
          <Text>{formatDuration(playQueue.currentTime)}</Text>
          <Gutter />
          <SeekBar key={playQueue.activeItem && playQueue.activeItem.id} />
          <Gutter />
          <Text>{formatDuration(playQueue.duration)}</Text>
        </View>
        <Gutter />
        <PlaybackButtons />
      </View>
    )
  }
}
