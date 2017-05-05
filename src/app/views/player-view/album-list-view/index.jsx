// @flow

import React from 'react'
import { inject, observer } from 'mobx-react'


import { Input, LoadingSlate, Transition } from 'ui'

import AlbumList from './album-list'

@inject('albumStore')
@inject('appState')

@observer
export default class AlbumListView extends React.PureComponent {
  render() {
    const { albumStore } = this.props
    return <Transition name={albumStore.isLoading ? 'loading' : 'ready'}>{this.renderContent()}</Transition>
  }

  renderContent() {
    const { albumStore } = this.props
    if (albumStore.isLoading) { return <LoadingSlate /> }
    return <AlbumList albums={albumStore.matches} />
  }
}
