import React from "react"
import { observer } from "mobx-react"

import { List } from "ui"

import PlayListItem from "./play-list-item"

const PlayList = (props) => {
  const renderRow = (row) => {
    return <PlayListItem key={row.id} item={row} />
  }

  return (
    <List
      className="flex-auto"
      style={{ overflow: "overlay" }}
      items={props.items}
      renderItem={renderRow}
    />
  )
}

export default observer(PlayList)
