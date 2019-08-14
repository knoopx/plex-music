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
        <h1 className="mb-4 text-2xl text-center font-medium">Choose server</h1>
        <div className="border border-default rounded">
          <List
            className="flex flex-col overflow-y-auto"
            items={store.devices}
            renderItem={renderItem}
          />
        </div>
      </div>
      <div className="flex flex-row items-center p-8">
        <span className="mr-8">Logged in as {store.loginParams.login}</span>
        <Button onClick={logOut}>Log Out</Button>
      </div>
    </div>
  )
}

export default inject(({ store }) => ({ store: store.account }))(
  observer(DeviceList),
)
