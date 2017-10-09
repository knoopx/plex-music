// @flow

import React from 'react'
import _ from 'lodash'
import { inject, observer } from 'mobx-react'

import { Text, View, TouchableOpacity, Rating, Gutter } from 'ui'

import { ListItem, Artwork } from 'app/components'

@inject('store')
@observer
export default class AlbumListItem extends React.Component {
  onPressArtistName(artistName) {
    this.props.store.albumStore.setQuery(`artist:"${artistName}"`)
  }

  onPressGenre(genre) {
    this.props.store.albumStore.setQuery(`genre:"${genre}"`)
  }

  onPressYear(year) {
    this.props.store.albumStore.setQuery(`year:${year}`)
  }

  onPressStudio(studio) {
    this.props.store.albumStore.setQuery(`studio:${studio}`)
  }

  async onClick(e) {
    this.props.album.addToPlaybackStore(e.shiftKey)
  }

  onStar(userRating) {
    this.props.album.rate(userRating)
  }

  render() {
    const { album, store } = this.props
    const isActive = album.id === (store.playbackStore.activeItem && store.playbackStore.activeItem.album.id)

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
          <View flow="row">
            <TouchableOpacity style={{ cursor: 'pointer' }} onClick={(e) => { e.stopPropagation(); this.onPressYear(album.year) }}>
              <Text muted size={12}>{album.year}</Text>
            </TouchableOpacity>
            {album.studio && (
              <TouchableOpacity style={{ marginLeft: 4, cursor: 'pointer' }} onClick={(e) => { e.stopPropagation(); this.onPressStudio(album.studio) }}>
                <Text muted size={12}>{album.studio}</Text>
              </TouchableOpacity>
            )}
          </View>
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
