// @flow

import React from 'react'
import relativeDate from 'relative-date'

import { inject, observer } from 'mobx-react'

import { View, Text, Gutter } from 'ui'
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
      <ListItem key={device.clientIdentifier} onClick={this.onClick} style={{ cursor: 'pointer' }}>
        <View flow="column" style={{ marginRight: 20 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{device.name}</Text>
          <Text style={{ fontSize: 12 }}>{relativeDate(device.lastSeenAt)}</Text>
        </View>
        <View flow="column" style={{ flex: 1, justifyContent: 'space-between' }}>
          <Text style={{ fontSize: 14 }}>{device.product} ({device.productVersion})</Text>
          <Gutter size={4} />
          <Text style={{ fontSize: 12 }}>{device.platform} ({device.platformVersion})</Text>
        </View>
      </ListItem>
    )
  }
}
