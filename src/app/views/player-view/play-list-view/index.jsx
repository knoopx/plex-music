// @flow

import React from 'react'
import { inject, observer } from 'mobx-react'


import { View, LoadingSlate, Transition, Divider } from 'ui'

import NowPlaying from './now-playing'
import PlayList from './play-list'

@inject(stores => ({ playbackStore: stores.store.playbackStore }))
@observer
export default class PlaylistView extends React.Component {
  render() {
    const { playbackStore } = this.props

    return (
      <Transition name={playbackStore.isFetching ? 'loading' : 'ready'}>
        {this.renderContent()}
      </Transition>
    )
  }

  renderContent() {
    const { playbackStore } = this.props

    if (playbackStore.isFetching) { return <LoadingSlate /> }

    return (
      <View flow="column" style={{ flex: 1 }}>
        {playbackStore.activeItem && <NowPlaying activeItem={playbackStore.activeItem} />}
        {playbackStore.activeItem && <Divider />}
        <PlayList items={playbackStore.playlist} />
      </View>
    )
  }
}
