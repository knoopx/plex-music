import React from "react"
import { inject, observer } from "mobx-react"
import { MdStar, MdSort, MdAccessTime } from "react-icons/md"

import { ButtonGroup, Button } from "ui"
import { OrderFn } from "store/album-store"

const iconMap = {
  alphabetically: MdSort,
  recentlyAdded: MdAccessTime,
  userRating: MdStar,
}

const OrderButtonGroup = ({ store }) => {
  return (
    <ButtonGroup>
      {Object.keys(OrderFn).map((order, index) => {
        const Icon = iconMap[order]

        return (
          <Button
            key={index}
            style={{ width: 48, height: 34 }}
            active={store.albumStore.order === order}
            onClick={() => {
              store.albumStore.setOrder(order)
            }}
          >
            <Icon size={18} style={{ verticalAlign: "center" }} />
          </Button>
        )
      })}
    </ButtonGroup>
  )
}

export default inject("store")(observer(OrderButtonGroup))
