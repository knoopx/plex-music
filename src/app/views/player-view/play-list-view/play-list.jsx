// @flow

import React from 'react'
import { observer } from 'mobx-react'

import { List } from 'ui'
import PlayListItem from './play-list-item'

@observer
export default class PlayList extends React.Component {
  renderRow(row) {
    return <PlayListItem key={row.id} item={row} />
  }

  render() {
    return (
      <List
        style={{ flex: 1, overflow: 'overlay' }}
        items={this.props.items}
        renderItem={this.renderRow}
      />
    )
  }
}
