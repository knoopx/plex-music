import React from 'react'
import { observer } from 'mobx-react'

import { View, Text, Gutter } from 'ui'
import { theme } from 'ui/theming'

import { Artwork } from 'app/components'

@theme('nowPlaying')
@observer
export default class NowPlaying extends React.Component {
  render() {
    const { style, activeItem } = this.props

    return (
      <View flow="row" style={{ padding: 10, ...style }}>
        <Artwork
          key={activeItem.album.id}
          size={48}
          src={activeItem.album.artwork}
        />
        <Gutter />
        <View flow="column">
          <Text bold>{activeItem.track.title}</Text>
          <Text>{activeItem.album.title}</Text>
          <Text muted>{activeItem.track.artistName}</Text>
        </View>
      </View>
    )
  }
}
