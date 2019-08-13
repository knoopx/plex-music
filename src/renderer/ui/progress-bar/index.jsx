import React from "react"
import PropTypes from "prop-types"

const ProgressBar = ({ progress = 0, height, color, borderColor }) => {
  return (
    <div
      style={{
        border: `1px solid ${borderColor}`,
        flex: 1,
        padding: 2,
        minWidth: 100,
        height,
        borderRadius: 3,
      }}
    >
      <div
        style={{
          display: "flex",
          width: `${progress * 100}%`,
          height: "100%",
          backgroundColor: color,
          borderRadius: 2,
          color: "white",
        }}
      />
    </div>
  )
}

ProgressBar.propTypes = { progress: PropTypes.number.isRequired }

export default ProgressBar
