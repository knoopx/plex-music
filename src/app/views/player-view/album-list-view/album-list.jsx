import React from "react"

import { VirtualList } from "ui"

import AlbumListItem from "./album-list-item"

const AlbumList = ({ albums }) => {
  return (
    <VirtualList itemHeight={64} items={albums}>
      {(row) => {
        return <AlbumListItem key={row.id} album={row} />
      }}
    </VirtualList>
  )
}

export default AlbumList
