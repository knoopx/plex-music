import React, { useEffect } from "react"
import { Motion, spring } from "react-motion"

const TouchableOpacity = ({ style, ...props }) => {
  let timeout
  const state = { isMouseDown: false }

  const onMouseDown = () => {
    setState({ isMouseDown: true })
  }

  const onMouseUp = () => {
    timeout = setTimeout(() => {
      setState({ isMouseDown: false })
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
    <div style={{ ...style }} onMouseDown={onMouseDown}>
      <Motion
        defaultStyle={{ opacity: 1 }}
        style={{ opacity: spring(state.isMouseDown ? 0.25 : 1) }}
      >
        {(animatedStyle) => <div {...props} style={{ ...animatedStyle }} />}
      </Motion>
    </div>
  )
}

export default TouchableOpacity
