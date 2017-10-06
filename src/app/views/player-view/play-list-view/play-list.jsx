// @flow

import React from 'react'
import { observer } from 'mobx-react'


import { List } from 'ui'
import type { PlayListItem as TPlayListItem } from 'stores/play-queue/types'

import PlayListItem from './play-list-item'


@observer
export default class PlayList extends React.Component {
  props: {
    items: Array<TPlayListItem>,
  }

  renderRow(row: TPlayListItem) {
    return <PlayListItem key={row.id} item={row} />
  }

  render() {
    return (
      <List
        style={{ flex: 1, overflow: 'auto' }}
        items={this.props.items}
        renderItem={this.renderRow}
      />
    )
  }
}
