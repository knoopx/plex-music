// @flow

import React from 'react'
import { inject, observer } from 'mobx-react'
import { autobind } from 'core-decorators'

import { View, LoadingSlate } from 'ui'
import { Divider } from 'ui/layout'

import NowPlaying from './now-playing'
import PlayList from './play-list'

@inject('playQueue')
@autobind
@observer
export default class PlaylistView extends React.Component {
  render() {
    const { playQueue } = this.props

    if (playQueue.isFetching) { return <LoadingSlate /> }
    return (
      <View flow="column" style={{ flex: 1 }}>
        {playQueue.activeItem && <NowPlaying />}
        {playQueue.activeItem && <Divider />}
        <PlayList items={playQueue.playlist} />
      </View>
    )
  }
}
