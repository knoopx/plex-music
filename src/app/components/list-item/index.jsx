import React from "react"

import { TouchableOpacity } from "ui"

const ListItem = ({ active, className, ...props }) => {
  return (
    <TouchableOpacity className={className}>
      <div
        className={[
          "flex items-center px-4 py-2 border-b",
          { "bg-active text-white": active },
          className,
        ]}
        {...props}
      />
    </TouchableOpacity>
  )
}

export default ListItem
