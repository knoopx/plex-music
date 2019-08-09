import React from "react"
import _ from "lodash"
import { inject, observer } from "mobx-react"

import { Text, TouchableOpacity, Rating } from "ui"
import { ListItem, Artwork } from "app/components"

const AlbumListItem = (props) => {
  const { album, store } = props

  const onPressArtistName = (artistName) => {
    props.store.albumStore.setQuery(`artist:"${artistName}"`)
  }

  const onPressGenre = (genre) => {
    props.store.albumStore.setQuery(`genre:"${genre}"`)
  }

  const onPressYear = (year) => {
    props.store.albumStore.setQuery(`year:${year}`)
  }

  const onPressStudio = (studio) => {
    props.store.albumStore.setQuery(`studio:${studio}`)
  }

  const onClick = (e) => {
    props.album.addToPlaybackStore(e.shiftKey)
  }

  const onStar = (userRating) => {
    props.album.rate(userRating)
  }

  const isActive =
    album.id ===
    (store.playbackStore.activeItem && store.playbackStore.activeItem.album.id)

  return (
    <ListItem active={isActive} onClick={onClick}>
      <Artwork key={album.id} size={48} src={album.artwork} />
      <div className="flex flex-auto flex-col ml-4">
        <Text bold>{album.title}</Text>
        <div className="flex flex-row">
          <TouchableOpacity
            className="cursor-pointer"
            onClick={(e) => {
              e.stopPropagation()
              onPressArtistName(album.artistName)
            }}
          >
            <span className="text-gray-500 text-sm">{album.artistName}</span>
          </TouchableOpacity>
        </div>
      </div>
      <div className="flex flex-auto flex-col items-end">
        <div className="flex flex-auto">
          <TouchableOpacity
            className="cursor-pointer"
            onClick={(e) => {
              e.stopPropagation()
              onPressYear(album.year)
            }}
          >
            <span className="text-gray-500 text-sm">{album.year}</span>
          </TouchableOpacity>
          {album.studio && (
            <TouchableOpacity
              className="cursor-pointer ml-2"
              onClick={(e) => {
                e.stopPropagation()
                onPressStudio(album.studio)
              }}
            >
              <span className="text-gray-500 text-sm">{album.studio}</span>
            </TouchableOpacity>
          )}
        </div>
        {album.genres.length > 0 && (
          <div className="flex flex-auto">
            {_.map(album.genres, (genre, index) => (
              <TouchableOpacity
                key={genre}
                className="cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation()
                  onPressGenre(genre)
                }}
              >
                <span className="text-gray-500 text-sm">
                  {genre}
                  {index !== album.genres.length - 1 && "/"}
                </span>
              </TouchableOpacity>
            ))}
          </div>
        )}
      </div>
      <Rating className="ml-4" value={album.userRating} onChange={onStar} />
    </ListItem>
  )
}

export default inject("store")(observer(AlbumListItem))
