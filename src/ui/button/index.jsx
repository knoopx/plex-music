import React from "react"
import PropTypes from "prop-types"

const Button = ({ active = false, className, ...props }) => {
  return (
    <button
      className={["bg-grey-lighter frame outline-none", className]}
      {...props}
    />
  )
}

Button.propTypes = {
  active: PropTypes.bool.isRequired,
}

export default Button
