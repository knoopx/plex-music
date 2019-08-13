//

import React from "react"
import { inject, observer } from "mobx-react"

import { Text } from "ui"
import { Artwork, ListItem } from "app/components"

const PlayListItem = (props) => {
  const { item, store } = props
  const { album, track } = item

  const onClick = (item) => {
    const { store } = props
    store.playbackStore.playItemAtIndex(
      store.playbackStore.playlist.indexOf(item),
    )
  }

  const isActive =
    store.playbackStore.playlist.indexOf(item) ===
    store.playbackStore.activeIndex

  return (
    <ListItem
      active={isActive}
      onClick={() => {
        onClick(item)
      }}
    >
      <Artwork key={album.id} size={32} src={album.artwork} />
      <div className="flex flex-col ml-2">
        <Text bold>{track.title}</Text>
        <Text muted size={12}>
          {track.artistName}
        </Text>
      </div>
    </ListItem>
  )
}

export default inject("store")(observer(PlayListItem))
