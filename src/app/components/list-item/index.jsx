import React from "react"

import { TouchableOpacity } from "ui"

const ListItem = ({ active, className, ...props }) => {
  return (
    <TouchableOpacity className={className}>
      <div
        className={[
          "border-b flex items-center px-4 py-2",
          { "bg-active": active },
          className,
        ]}
        {...props}
      />
    </TouchableOpacity>
  )
}

export default ListItem
