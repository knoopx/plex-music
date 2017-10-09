// @flow
import React from 'react'
import { inject, observer } from 'mobx-react'

import { Text, View, Gutter } from 'ui'

import SeekBar from './seek-bar'
import PlaybackButtons from './playback-buttons'

function formatDuration(input = 0) {
  const z = n => ((n < 10 ? '0' : '')) + n
  return `${z(Math.floor(input / 60))}:${z(Math.floor(input % 60))}`
}

@inject('store')
@observer
export default class PlayerView extends React.Component {
  render() {
    const { store } = this.props
    return (
      <View flow="row" style={{ flex: 1, alignItems: 'center' }}>
        <View flow="row" style={{ flex: 1, alignItems: 'center' }}>
          <Text>{formatDuration(store.playbackStore.currentTime)}</Text>
          <Gutter />
          <SeekBar key={store.playbackStore.activeItem && store.playbackStore.activeItem.id} />
          <Gutter />
          <Text>{formatDuration(store.playbackStore.duration)}</Text>
        </View>
        <Gutter />
        <PlaybackButtons />
      </View>
    )
  }
}
