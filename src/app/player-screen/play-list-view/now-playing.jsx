// @flow

import React from 'react'
import { inject, observer } from 'mobx-react'

import { View, Text } from 'ui'
import { Gutter } from 'ui/layout'

import Artwork from '../artwork'

@inject('theme')
@inject('playQueue')
@observer
export default class NowPlaying extends React.Component {
  render() {
    const { playQueue, theme } = this.props
    const { activeItem } = playQueue

    return (
      <View flow="row" style={{ padding: 10, backgroundColor: theme.secondaryBackgroundColor }}>
        <Artwork key={activeItem.album.id} size={48} src={activeItem.album.artwork} />
        <Gutter />
        <View flow="column">
          <Text style={{ fontWeight: 'bold' }}>{activeItem.track.title}</Text>
          <Text>{activeItem.album.title}</Text>
          <Text style={{ color: theme.textMutedColor }}>{activeItem.track.artistName}</Text>
        </View>
      </View>
    )
  }
}
