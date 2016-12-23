// @flow

import React from 'react'
import { autobind } from 'core-decorators'

import { View, VirtualList } from 'ui'

import AlbumListItem from './album-list-item'

@autobind
export default class AlbumList extends React.Component {
  props: {
    albums: Array<Object>,
  }

  renderRow(row: Object) {
    return (
      <AlbumListItem key={row.id} album={row} />
    )
  }

  render() {
    return (
      <VirtualList
        itemHeight={64}
        items={this.props.albums}
        renderItem={this.renderRow}
      />
    )
  }
}
