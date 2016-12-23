// @flow

import React from 'react'
import { inject, observer } from 'mobx-react'
import { autobind } from 'core-decorators'

import type { PlayListItem as TPlayListItem } from 'stores/play-queue/types'

import { TouchableOpacity, View } from 'ui'
import { Gutter } from 'ui/layout'

import Artwork from '../artwork'

@inject('theme')
@inject('playQueue')
@autobind
@observer
export default class PlayListItem extends React.Component {
  props: {
    item: TPlayListItem
  }

  onClick(item: PlayListItem) {
    const { playQueue } = this.props
    playQueue.playItemAtIndex(playQueue.playlist.indexOf(item))
  }

  render() {
    const { item, playQueue, theme } = this.props
    const { album, track } = item

    const isActive = playQueue.playlist.indexOf(item) === playQueue.activeIndex
    const backgroundColor = isActive ? theme.activeBackgroundColor : null
    const textColor = isActive ? theme.activeTextColor : null
    const textMutedColor = isActive ? theme.activeTextMutedColor : theme.textMutedColor

    return (
      <TouchableOpacity style={{ flex: 1, borderBottom: `1px solid ${theme.borderColor}` }} onClick={() => { this.onClick(item) }}>
        <View flow="row" style={{ alignItems: 'center', backgroundColor, padding: 8 }}>
          <Artwork key={album.id} size={32} src={album.artwork} />
          <Gutter />
          <View flow="column">
            <span style={{ fontWeight: 'bold', color: textColor }}>{track.title}</span>
            <span style={{ color: textMutedColor }}>{track.artistName}</span>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}
