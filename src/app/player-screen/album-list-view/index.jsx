// @flow

import React from 'react'
import { inject, observer } from 'mobx-react'
import { autobind } from 'core-decorators'

import { Input, LoadingSlate } from 'ui'

import AlbumList from './album-list'

@inject('albumStore')
@inject('appState')
@autobind
@observer
export default class AlbumListView extends React.Component {
  input: ?Input;
  listView: ?AlbumList;

  render() {
    const { albumStore } = this.props

    if (albumStore.isLoading) { return <LoadingSlate /> }
    return <AlbumList ref={(node) => { this.listView = node }} albums={albumStore.matches} />
  }
}
