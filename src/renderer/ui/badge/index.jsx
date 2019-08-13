import React from "react"

const Badge = (props) => {
  return (
    <div
      style={{
        textAlign: "center",
        minWidth: 32,
        padding: "2px 8px",
        borderRadius: 999999,
      }}
      {...props}
    />
  )
}

export default Badge
