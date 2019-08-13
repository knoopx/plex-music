import React from "react"

const Input = ({ style, ...props }) => {
  return (
    <input
      {...props}
      style={{
        ...style,
        color: "inherit",
        WebkitAppearance: "none",
        border: "none",
        outline: "none",
        borderRadius: "2px",
        alignItems: "center",
        padding: "0 8px",
      }}
    />
  )
}

export default Input
