// @flow

import React from 'react'
import { inject, observer } from 'mobx-react'


import PlayQueue from 'stores/play-queue'
import type { PlayListItem as TPlayListItem } from 'stores/play-queue/types'

import { View, Text, Gutter } from 'ui'

import { Artwork, ListItem } from 'app/components'

@inject('playQueue')

@observer
export default class PlayListItem extends React.PureComponent {
  props: {
    item: TPlayListItem,
    playQueue: PlayQueue
  }

  onClick(item: PlayListItem) {
    const { playQueue } = this.props
    playQueue.playItemAtIndex(playQueue.playlist.indexOf(item))
  }

  render() {
    const { item, playQueue } = this.props
    const { album, track } = item

    const isActive = playQueue.playlist.indexOf(item) === playQueue.activeIndex

    return (
      <ListItem active={isActive} onClick={() => { this.onClick(item) }}>
        <Artwork key={album.id} size={32} src={album.artwork} />
        <Gutter />
        <View flow="column">
          <Text bold>{track.title}</Text>
          <Text muted size={12}>{track.artistName}</Text>
        </View>
      </ListItem>
    )
  }
}
