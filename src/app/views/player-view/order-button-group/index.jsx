import React from 'react'

// import { FaStar, FaClockO, FaSortAlphaAsc } from 'react-icons/fa'

import FaStar from '@fortawesome/fontawesome-free/svgs/solid/star.svg'
import FaClockO from '@fortawesome/fontawesome-free/svgs/regular/clock.svg'
import FaSortAlphaAsc from '@fortawesome/fontawesome-free/svgs/solid/sort-alpha-down.svg'

// console.log({ FaStar, FaClockO, FaSortAlphaAsc })

import { inject, observer } from 'mobx-react'
import { ButtonGroup, Button } from 'ui'

import { OrderFn } from 'store/album-store'

const iconMap = {
  alphabetically: FaSortAlphaAsc,
  recentlyAdded: FaClockO,
  userRating: FaStar,
}

@inject('store')
@observer
export default class OrderButtonGroup extends React.Component {
  render() {
    return (
      <ButtonGroup>{Object.keys(OrderFn).map(this.renderButton)}</ButtonGroup>
    )
  }

  renderButton(order, index) {
    const { store } = this.props

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
        <Icon height={16} style={{ verticalAlign: 'center' }} />
      </Button>
    )
  }
}
