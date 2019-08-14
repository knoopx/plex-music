import React from "react"
import relativeDate from "relative-date"
import { inject, observer } from "mobx-react"
import { ListItem } from "app/components"

const DeviceListItem = ({ store, device }) => {
  const onClick = () => {
    store.setActiveDevice(device)
  }

  return (
    <ListItem
      className="cursor-pointer"
      key={device.clientIdentifier}
      onClick={onClick}
    >
      <div className="flex flex-col mr-4">
        <div className="text-lg font-medium">{device.name}</div>
        <div className="text-gray-500 text-xs">
          {relativeDate(device.lastSeenAt)}
        </div>
      </div>
      <div className="flex flex-col justify-between">
        <div>
          {device.platform} ({device.platformVersion})
        </div>
        <div className="text-sm">
          {device.product} ({device.productVersion})
        </div>
      </div>
    </ListItem>
  )
}

export default inject("store")(observer(DeviceListItem))
