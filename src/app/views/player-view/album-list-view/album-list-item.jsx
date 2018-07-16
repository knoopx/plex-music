//

import React from 'react'
import _ from 'lodash'
import { inject, observer } from 'mobx-react'

import { Text, TouchableOpacity, Rating } from 'ui'

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
        <div className="ml-4 flex flex-col flex-auto">
          <Text bold>
            {album.title}
          </Text>
          <div className="flex flex-row">
            <TouchableOpacity className="cursor-pointer" onClick={(e) => { e.stopPropagation(); this.onPressArtistName(album.artistName) }}>
              <Text muted className="text-sm">
                {album.artistName}
              </Text>
            </TouchableOpacity>
          </div>
        </div>
        <div className="flex flex-col flex-auto items-end">
          <div className="flex flex-auto">
            <TouchableOpacity className="cursor-pointer" onClick={(e) => { e.stopPropagation(); this.onPressYear(album.year) }}>
              <Text muted className="text-sm">
                {album.year}
              </Text>
            </TouchableOpacity>
            {album.studio && (
              <TouchableOpacity className="cursor-pointer ml-2" onClick={(e) => { e.stopPropagation(); this.onPressStudio(album.studio) }}>
                <Text muted className="text-sm">
                  {album.studio}
                </Text>
              </TouchableOpacity>
            )}
          </div>
          {album.genres.length > 0 && (
            <div className="flex flex-auto">
              {_.map(album.genres, (genre, index) => (
                <TouchableOpacity key={genre} className="cursor-pointer" onClick={(e) => { e.stopPropagation(); this.onPressGenre(genre) }}>
                  <Text muted className="text-sm">
                    {genre}
                    {index !== album.genres.length - 1 && '/'}
                  </Text>
                </TouchableOpacity>
              ))}
            </div>
          )}
        </div>
        <Rating className="ml-4" value={album.userRating} onChange={this.onStar} />
      </ListItem>
    )
  }
}
