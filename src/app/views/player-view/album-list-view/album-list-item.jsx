// @flow

import React from 'react'
import _ from 'lodash'
import { action } from 'mobx'
import { inject, observer } from 'mobx-react'


import { AppState, PlayQueue, AlbumStore } from 'stores'
import { Album } from 'models'
import { Text, View, TouchableOpacity, Rating, Gutter } from 'ui'
import { theme } from 'react-theme'

import { ListItem, Artwork } from 'app/components'

@inject('appState')
@inject('albumStore')
@inject('playQueue')

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

  async onClick(e: SyntheticMouseEvent) {
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
    const { album, playQueue } = this.props
    const isActive = album.id === (playQueue.activeItem && playQueue.activeItem.album.id)

    return (
      <ListItem active={isActive} onClick={this.onClick}>
        <Artwork key={album.id} size={48} src={album.artwork} />
        <Gutter />
        <View flow="column" style={{ flex: 1 }}>
          <Text bold style={{ cursor: 'default' }}>{album.title}</Text>
          <View flow="row">
            <TouchableOpacity style={{ cursor: 'pointer' }} onClick={(e) => { e.stopPropagation(); this.onPressArtistName(album.artistName) }}>
              <Text muted size={12}>{album.artistName}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Gutter />
        <View flow="column" style={{ alignItems: 'flex-end' }}>
          <TouchableOpacity style={{ cursor: 'pointer' }} onClick={(e) => { e.stopPropagation(); this.onPressYear(album.year) }}>
            <Text muted size={12}>{album.year}</Text>
          </TouchableOpacity>
          {album.genres.length > 0 && (
            <View flow="row">
              {_.map(album.genres, (genre, index) => (
                <TouchableOpacity key={genre} style={{ cursor: 'pointer' }} onClick={(e) => { e.stopPropagation(); this.onPressGenre(genre) }}>
                  <Text muted size={12} >{genre}{index !== album.genres.length - 1 && '/'}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
        <Gutter />
        <Rating value={album.userRating} onChange={this.onStar} />
      </ListItem>
    )
  }
}
