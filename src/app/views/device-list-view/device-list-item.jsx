//

import React from "react"
import relativeDate from "relative-date"
import { inject, observer } from "mobx-react"

import { Text } from "ui"
import { ListItem } from "app/components"

const DeviceListItem = (props) => {
  const { device } = props

  const onClick = () => {
    props.store.setActiveDevice(props.device)
  }

  return (
    <ListItem
      className="cursor-pointer"
      key={device.clientIdentifier}
      onClick={onClick}
    >
      <div className="flex flex-col mr-4">
        <Text style={{ fontWeight: "bold", fontSize: 18 }}>{device.name}</Text>
        <Text style={{ fontSize: 12 }}>{relativeDate(device.lastSeenAt)}</Text>
      </div>
      <div className="flex flex-col justify-between">
        <Text style={{ fontSize: 14 }}>
          {device.product} ({device.productVersion})
        </Text>
        <Text style={{ fontSize: 12 }}>
          {device.platform} ({device.platformVersion})
        </Text>
      </div>
    </ListItem>
  )
}

export default inject("store")(observer(DeviceListItem))
