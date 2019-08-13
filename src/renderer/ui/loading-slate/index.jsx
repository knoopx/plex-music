import React from "react"

import Spinner from "../spinner"

const LoadingSlate = (props) => {
  const { style } = props
  return (
    <div
      style={{
        display: "flex",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        ...style,
      }}
    >
      <Spinner size={64} />
    </div>
  )
}

export default LoadingSlate
