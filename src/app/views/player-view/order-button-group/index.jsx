import React from "react"
import FaStar from "@fortawesome/fontawesome-free/svgs/solid/star.svg"
import FaClockO from "@fortawesome/fontawesome-free/svgs/regular/clock.svg"
import FaSortAlphaAsc from "@fortawesome/fontawesome-free/svgs/solid/sort-alpha-down.svg"
import { inject, observer } from "mobx-react"

import { ButtonGroup, Button } from "ui"
import { OrderFn } from "store/album-store"

const iconMap = {
  alphabetically: FaSortAlphaAsc,
  recentlyAdded: FaClockO,
  userRating: FaStar,
}

const OrderButtonGroup = (props) => {
  const { store } = props
  const renderButton = (order, index) => {
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
        <Icon height={16} style={{ verticalAlign: "center" }} />
      </Button>
    )
  }

  return <ButtonGroup>{Object.keys(OrderFn).map(renderButton)}</ButtonGroup>
}

export default inject("store")(observer(OrderButtonGroup))
