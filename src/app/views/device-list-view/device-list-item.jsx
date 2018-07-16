//

import React from 'react'
import relativeDate from 'relative-date'

import { inject, observer } from 'mobx-react'

import { Text } from 'ui'
import { ListItem } from 'app/components'

@inject('store')

@observer
export default class DeviceListItem extends React.Component {
  onClick() {
    this.props.store.setActiveDevice(this.props.device)
  }

  render() {
    const { device } = this.props
    return (
      <ListItem className="cursor-pointer" key={device.clientIdentifier} onClick={this.onClick}>
        <div className="flex flex-col mr-4">
          <Text style={{ fontWeight: 'bold', fontSize: 18 }}>
            {device.name}
          </Text>
          <Text style={{ fontSize: 12 }}>
            {relativeDate(device.lastSeenAt)}
          </Text>
        </div>
        <div className="flex flex-col justify-between">
          <Text style={{ fontSize: 14 }}>
            {device.product}
            {' '}
(
            {device.productVersion}
)
          </Text>
          <Text style={{ fontSize: 12 }}>
            {device.platform}
            {' '}
(
            {device.platformVersion}
)
          </Text>
        </div>
      </ListItem>
    )
  }
}
