import React from "react"
import PropTypes from "prop-types"

const Spinner = ({ size }) => {
  return (
    <div className="spinner" style={{ width: size, height: size }}>
      <div className="spinner-bar" />
      <div className="spinner-bar" />
      <div className="spinner-bar" />
    </div>
  )
}

Spinner.propTypes = {
  size: PropTypes.number.isRequired,
}

export default Spinner
