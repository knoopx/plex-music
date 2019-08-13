import React from "react"

const Select = ({ className, ...props }) => {
  return (
    <select
      className={["appearance-none frame rounded-none", className]}
      {...props}
    />
  )
}

export default Select
