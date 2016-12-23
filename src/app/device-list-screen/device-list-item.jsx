// @flow

import React from 'react'
import relativeDate from 'relative-date'
import { autobind } from 'core-decorators'

import { inject, observer } from 'mobx-react'

import { AppState } from 'stores'
import Device from 'stores/account/device'
import { TouchableOpacity, View } from 'ui'

@inject('appState')
@autobind
@observer
export default class DeviceListItem extends React.Component {
  props: {
    device: Device,
    appState: AppState
  }

  onClick() {
    this.props.appState.connect(this.props.device)
  }

  render() {
    const { device } = this.props
    return (
      <TouchableOpacity key={device.clientIdentifier} onClick={this.onClick}>
        <View flow="row" style={{ alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#ddd', padding: '8px 16px' }}>
          <View flow="column" style={{ marginRight: 20 }}>
            <span style={{ fontWeight: 'bold', fontSize: 18 }}>{device.name}</span>
            <span>{relativeDate(device.lastSeenAt)}</span>
          </View>
          <View flow="column" style={{ flex: 1, justifyContent: 'space-between' }}>
            <span style={{ fontSize: 14 }}>{device.product} ({device.productVersion})</span>
            <span style={{ fontSize: 12 }}>{device.platform} ({device.platformVersion})</span>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}
