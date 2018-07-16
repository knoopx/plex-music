import React from 'react'

import RecentIcon from 'react-icons/lib/fa/clock-o'
import AscendingIcon from 'react-icons/lib/fa/sort-alpha-asc'
import StarIcon from 'react-icons/lib/fa/star'

import { inject, observer } from 'mobx-react'
import { ButtonGroup, Button } from 'ui'

import { OrderFn } from 'store/album-store'


const iconMap = {
  alphabetically: AscendingIcon,
  recentlyAdded: RecentIcon,
  userRating: StarIcon,
}

@inject('store')
@observer
export default class OrderButtonGroup extends React.Component {
  render() {
    return (
      <ButtonGroup>
        {Object.keys(OrderFn).map(this.renderButton)}
      </ButtonGroup>
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
        onClick={() => { store.albumStore.setOrder(order) }}
      >
        <Icon size={16} />
      </Button>
    )
  }
}
