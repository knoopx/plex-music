// @flow

import React from 'react'
import { inject, observer } from 'mobx-react'


import { Text, View, Gutter, List, Button, Frame } from 'ui'

import DeviceListItem from './device-list-item'

@inject(({ store }) => ({ store: store.account }))
@observer
export default class DeviceList extends React.Component {
  render() {
    const { store } = this.props

    return (
      <View
        flow="column"
        style={{ flex: 1, paddingTop: 37, alignItems: 'center', justifyContent: 'center' }}
      >
        <View flow="column" style={{ flex: 1 }}>
          <Text bold size={24}>Choose server</Text>
          <Gutter />
          <Frame>
            <List style={{ flex: 1, overflowY: 'auto' }} items={store.devices} renderItem={this.renderItem} />
          </Frame>
        </View>
        <View flow="row" style={{ padding: 32, alignItems: 'center' }}>
          <Text>Logged in as {store.loginParams.login}</Text>
          <Gutter />
          <Button onClick={this.logOut}>Log Out</Button>
        </View>
      </View>
    )
  }

  renderItem(device: Device) {
    return <DeviceListItem key={device.clientIdentifier} device={device} />
  }

  logOut() {
    this.props.store.logOut()
  }
}
