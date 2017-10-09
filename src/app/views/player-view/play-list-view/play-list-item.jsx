// @flow

import React from 'react'
import { inject, observer } from 'mobx-react'

import { View, Text, Gutter } from 'ui'

import { Artwork, ListItem } from 'app/components'

@inject('store')
@observer
export default class PlayListItem extends React.Component {
  onClick(item) {
    const { store } = this.props
    store.playbackStore.playItemAtIndex(store.playbackStore.playlist.indexOf(item))
  }

  render() {
    const { item, store } = this.props
    const { album, track } = item

    const isActive = store.playbackStore.playlist.indexOf(item) === store.playbackStore.activeIndex

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
