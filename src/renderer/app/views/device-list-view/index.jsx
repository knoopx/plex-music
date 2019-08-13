import React from "react"
import { inject, observer } from "mobx-react"

import { Text, List, Button, Frame } from "ui"

import DeviceListItem from "./device-list-item"

const DeviceList = (props) => {
  const { store } = props

  const renderItem = (device) => {
    return <DeviceListItem key={device.clientIdentifier} device={device} />
  }

  const logOut = () => {
    props.store.logOut()
  }

  return (
    <div
      className="flex flex-auto flex-col items-center justify-center"
      style={{ paddingTop: 37 }}
    >
      <div className="flex flex-auto flex-col">
        <Text bold size={24}>
          Choose server
        </Text>
        <Frame>
          <List
            className="flex flex-col overflow-y-auto"
            items={store.devices}
            renderItem={renderItem}
          />
        </Frame>
      </div>
      <div className="flex flex-row items-center p-8">
        <Text>
          Logged in as
          {store.loginParams.login}
        </Text>
        <Button onClick={logOut}>Log Out</Button>
      </div>
    </div>
  )
}

export default inject(({ store }) => ({ store: store.account }))(
  observer(DeviceList),
)
