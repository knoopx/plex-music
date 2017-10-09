// @flow

import React from 'react'
import { inject, observer } from 'mobx-react'

import { LoadingSlate, Transition } from 'ui'

import AlbumList from './album-list'

@inject('store')
@observer
export default class AlbumListView extends React.Component {
  render() {
    const { store } = this.props
    return <Transition name={store.albumStore.isLoading ? 'loading' : 'ready'}>{this.renderContent()}</Transition>
  }

  renderContent() {
    const { store } = this.props
    if (store.albumStore.isLoading) { return <LoadingSlate /> }
    return <AlbumList albums={store.albumStore.matches} />
  }
}
