import React from "react"

import styles from "./button-group.css"

const ButtonGroup = (props) => {
  return (
    <div className={styles.default} {...props}>
      {React.Children.map(props.children, (child) => {
        return React.cloneElement(child, { className: styles.button })
      })}
    </div>
  )
}

export default ButtonGroup
