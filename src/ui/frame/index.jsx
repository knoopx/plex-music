import React from "react"

const Frame = ({ className, ...props }) => {
  return <div className={["flex-auto frame", className]} {...props} />
}

export default Frame
