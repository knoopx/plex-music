import React from 'react'
import { inject, observer } from 'mobx-react'

import { View, LoadingSlate, Transition, Divider } from 'ui'

import NowPlaying from './now-playing'
import PlayList from './play-list'

@inject('playQueue')
@observer
export default class PlaylistView extends React.Component {
  render() {
    const { playQueue } = this.props

    return (
      <Transition name={playQueue.isFetching ? 'loading' : 'ready'}>
        {this.renderContent()}
      </Transition>
    )
  }

  renderContent() {
    const { playQueue } = this.props

    if (playQueue.isFetching) {
      return <LoadingSlate />
    }

    return (
      <View flow="column" style={{ flex: 1 }}>
        {playQueue.activeItem && (
          <NowPlaying activeItem={playQueue.activeItem} />
        )}
        {playQueue.activeItem && <Divider />}
        <PlayList items={playQueue.playlist} />
      </View>
    )
  }
}
