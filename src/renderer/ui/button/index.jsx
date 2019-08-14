import React from "react"
import PropTypes from "prop-types"

const Button = ({ active, kind, className, ...props }) => {
  const base = {
    primary: ["bg-primary border-primary text-white"],
    default: ["bg-default border-default", { "bg-active": active }],
  }
  return (
    <a
      className={[
        "cursor-pointer inline-flex items-center justify-center px-3 py-1 border rounded shadow-xs text-shadow",
        ...base[kind],
        className,
      ]}
      {...props}
    />
  )
}

Button.defaultProps = {
  kind: "default",
}

export default Button
