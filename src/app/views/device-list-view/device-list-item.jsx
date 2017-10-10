import React from 'react'
import PropTypes from 'prop-types'
import relativeDate from 'relative-date'

import { inject, observer } from 'mobx-react'

import Device from 'stores/account/device'
import { AppState } from 'stores'
import { View, Text, Gutter } from 'ui'
import { ListItem } from 'app/components'

@inject('appState')

@observer
export default class DeviceListItem extends React.Component {
  static propTypes = {
    device: PropTypes.instanceOf(Device).isRequired,
    appState: PropTypes.instanceOf(AppState).isRequired,
  }

  onClick() {
    this.props.appState.connect(this.props.device)
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
