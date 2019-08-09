import React from "react"
import PropTypes from "prop-types"

const Indicator = ({ active = false, size = 8 }) => {
  return (
    <div
      style={{
        borderRadius: 99999,
        width: size,
        height: size,
        backgroundColor: active ? "blue" : "red",
      }}
    />
  )
}

Indicator.propTypes = {
  active: PropTypes.bool.isRequired,
  size: PropTypes.number.isRequired,
}

export default Indicator
