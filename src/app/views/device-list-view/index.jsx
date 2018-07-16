//

import React from 'react'
import { inject, observer } from 'mobx-react'


import { Text, List, Button, Frame } from 'ui'

import DeviceListItem from './device-list-item'

@inject(({ store }) => ({ store: store.account }))
@observer
export default class DeviceList extends React.Component {
  render() {
    const { store } = this.props

    return (
      <div
        className="flex flex-col flex-auto items-center justify-center"
        style={{ paddingTop: 37 }}
      >
        <div className="flex flex-auto flex-col">
          <Text bold size={24}>
Choose server
          </Text>
          <Frame>
            <List className="flex flex-col overflow-y-auto" items={store.devices} renderItem={this.renderItem} />
          </Frame>
        </div>
        <div className="flex flex-row p-8 items-center">
          <Text>
Logged in as
            {store.loginParams.login}
          </Text>
          <Button onClick={this.logOut}>
Log Out
          </Button>
        </div>
      </div>
    )
  }

  renderItem(device) {
    return <DeviceListItem key={device.clientIdentifier} device={device} />
  }

  logOut() {
    this.props.store.logOut()
  }
}
