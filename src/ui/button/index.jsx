import React from "react"
import PropTypes from "prop-types"

const Button = ({ active, className, ...props }) => {
  return (
    <a
      className={[
        "cursor-pointer outline-none inline-flex items-center justify-center bg-white frame",
        { "bg-active": active },
        className,
      ]}
      {...props}
    />
  )
}

export default Button
