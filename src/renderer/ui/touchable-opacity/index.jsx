import React, { useEffect, useState } from "react"
import { useSpring, animated } from "react-spring"

const TouchableOpacity = ({ style, ...props }) => {
  let timeout

  const [spring, set] = useSpring(() => ({ opacity: 1 }))

  const onMouseDown = () => {
    set({ opacity: 0.25 })
  }

  const onMouseUp = () => {
    timeout = setTimeout(() => {
      set({ opacity: 1 })
    }, 200)
  }

  useEffect(() => {
    window.addEventListener("mouseup", onMouseUp)
    return () => {
      clearTimeout(timeout)
      window.removeEventListener("mouseup", onMouseUp)
    }
  }, [])

  return (
    <animated.div
      {...props}
      style={{ ...style, ...spring }}
      onMouseDown={onMouseDown}
    />
  )
}

export default TouchableOpacity
