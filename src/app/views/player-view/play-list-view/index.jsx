//

import React from 'react'
import { inject, observer } from 'mobx-react'


import { LoadingSlate, Transition } from 'ui'

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
      <div className="flex flex-auto flex-col">
        {playbackStore.activeItem && <NowPlaying activeItem={playbackStore.activeItem} />}
        <PlayList items={playbackStore.playlist} />
      </div>
    )
  }
}
