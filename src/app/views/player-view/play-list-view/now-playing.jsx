import React from "react"
import { observer } from "mobx-react"

import { Text } from "ui"
import { Artwork } from "app/components"

const NowPlaying = ({ activeItem, ...props }) => {
  return (
    <div className="bg-grey-lighter flex flex-none p-4" {...props}>
      <Artwork
        key={activeItem.album.id}
        size={48}
        src={activeItem.album.artwork}
      />
      <div className="flex flex-col ml-4">
        <Text bold>{activeItem.track.title}</Text>
        <Text>{activeItem.album.title}</Text>
        <Text muted>{activeItem.track.artistName}</Text>
      </div>
    </div>
  )
}

export default observer(NowPlaying)
