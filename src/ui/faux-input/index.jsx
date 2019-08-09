import React, { forwardRef } from "react"

const FauxInput = ({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={[
        "outline-none flex-auto bg-transparent input-reset",
        className,
      ]}
      {...props}
    />
  )
}

export default forwardRef(FauxInput)
