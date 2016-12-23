// @flow

import React from 'react'
import _ from 'lodash'
import { action } from 'mobx'
import { inject, observer } from 'mobx-react'
import { autobind } from 'core-decorators'

import { AppState, PlayQueue, AlbumStore } from 'stores'
import { Album } from 'models'
import { View, TouchableOpacity, Rating } from 'ui'
import { Gutter } from 'ui/layout'

import Artwork from '../artwork'

@inject('theme')
@inject('appState')
@inject('albumStore')
@inject('playQueue')
@autobind
@observer
export default class AlbumListItem extends React.Component {
  props: {
    appState: AppState,
    playQueue: PlayQueue,
    albumStore: AlbumStore,
    album: Album;
  }

  onPressArtistName(artistName: string) {
    this.props.albumStore.setQuery(`artist:"${artistName}"`)
  }

  onPressGenre(genre: string) {
    this.props.albumStore.setQuery(`genre:"${genre}"`)
  }

  onPressYear(year: string) {
    this.props.albumStore.setQuery(`year:${year}`)
  }

  async onClick(e) {
    const shouldAppend = e.shiftKey
    const { album, appState, playQueue } = this.props

    playQueue.unload()
    playQueue.setIsFetching(true)

    const tracks = await appState.connection.tracks.findAllByAlbumId(album.id)
    const items = _.map(tracks, t => ({ track: t, album }))
    if (shouldAppend) {
      playQueue.append(items)
    } else {
      playQueue.replace(items)
    }
    playQueue.setIsFetching(false)
  }

  onStar(userRating: number) {
    const { album } = this.props

    if (album.userRating === userRating) {
      this.performRate(album, 0)
    } else {
      this.performRate(album, userRating)
    }
  }

  @action async performRate(album: Album, userRating: number) {
    await album.rate(userRating)
    album.update({ userRating })
  }

  render() {
    const { album, playQueue, theme } = this.props

    const isActive = album.id === (playQueue.activeItem && playQueue.activeItem.album.id)
    const backgroundColor = isActive ? theme.activeBackgroundColor : undefined
    const textColor = isActive ? theme.activeTextColor : undefined
    const textMutedColor = isActive ? theme.activeTextMutedColor : theme.textMutedColor

    return (
      <TouchableOpacity onClick={this.onClick} style={{ borderBottom: `1px solid ${theme.borderColor}` }}>
        <View flow="row" style={{ alignItems: 'center', padding: 8, backgroundColor }} >
          <Artwork key={album.id} size={48} src={album.artwork} />
          <Gutter />
          <View flow="column" style={{ flex: 1 }}>
            <span style={{ fontWeight: 'bold', color: textColor }}>{album.title}</span>
            <View flow="row">
              <TouchableOpacity onClick={(e) => { e.stopPropagation(); this.onPressArtistName(album.artistName) }}>
                <span style={{ color: textMutedColor }}>{album.artistName}</span>
              </TouchableOpacity>
            </View>
          </View>
          <Gutter />
          <View flow="column" style={{ alignItems: 'flex-end' }}>
            <TouchableOpacity onClick={(e) => { e.stopPropagation(); this.onPressYear(album.year) }}>
              <span style={{ color: textMutedColor, fontSize: 12 }}>{album.year}</span>
            </TouchableOpacity>
            {album.genres.length > 0 && <View flow="row">{_.map(album.genres, (genre, index) => (
              <TouchableOpacity key={genre} onClick={(e) => { e.stopPropagation(); this.onPressGenre(genre) }}>
                <span style={{ color: textMutedColor, fontSize: 12 }}>{genre}{index !== album.genres.length - 1 && '/'}</span>
              </TouchableOpacity>
            ))}</View>}
          </View>
          <Gutter />
          <Rating value={album.userRating} onChange={this.onStar} color={textColor} />
        </View>
      </TouchableOpacity>
    )
  }
}
