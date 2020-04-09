import React from 'react'
import PropTypes from 'prop-types'

import { VirtualList } from 'ui'

import AlbumListItem from './album-list-item'

export default class AlbumList extends React.PureComponent {
  static defaultProps = {
    albums: [],
  }

  renderRow(row) {
    return <AlbumListItem key={row.id} album={row} />
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
