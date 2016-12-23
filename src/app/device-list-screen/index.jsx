// @flow

import _ from 'lodash'
import React from 'react'
import { inject, observer } from 'mobx-react'
import { autobind } from 'core-decorators'

import { View } from 'ui'

import Device from 'stores/account/device'
import DeviceListItem from './device-list-item'

@inject('account')
@autobind
@observer
export default class DeviceList extends React.Component {
  renderItem(device: Device) {
    return <DeviceListItem key={device.clientIdentifier} device={device} />
  }

  render() {
    return (
      <View flow="column" style={{ flex: 1, paddingTop: 37, backgroundColor: 'white', borderBottomWidth: 1, borderBottomColor: '#ddd' }}>
        {_.map(this.props.account.devices, this.renderItem)}
      </View>
    )
  }
}
