import React from "react"

import { VirtualList } from "ui"

import AlbumListItem from "./album-list-item"

const AlbumList = (props) => {
  const renderRow = (row) => {
    return <AlbumListItem key={row.id} album={row} />
  }

  return (
    <VirtualList itemHeight={64} items={props.albums} renderItem={renderRow} />
  )
}

export default AlbumList
