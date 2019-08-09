import React from "react"

const FauxInput = ({ className, style, ...props }) => {
  return (
    <input
      className={[
        "bg-transparent flex-auto input-reset outline-none",
        className,
      ]}
      {...props}
    />
  )
}

export default FauxInput
