import React from "react"

const Input = ({ className, ...props }) => {
  return (
    <input
      className={[
        "focus:outline-none px-3 py-2 border border-default border-xs rounded-sm shadow-xs",
        className,
      ]}
      {...props}
    />
  )
}

export default Input
