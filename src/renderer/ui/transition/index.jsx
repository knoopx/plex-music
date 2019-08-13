import React from "react"
import { TransitionMotion, spring } from "react-motion"

const Transition = (props) => {
  const getStyles = () => {
    return React.Children.map(props.children, (child) => ({
      key: props.name,
      style: { opacity: spring(1) },
      data: child,
    }))
  }

  const willEnter = () => {
    return { opacity: 0 }
  }

  const willLeave = () => {
    return { opacity: spring(0) }
  }

  return (
    <TransitionMotion
      styles={getStyles()}
      willEnter={willEnter}
      willLeave={willLeave}
    >
      {(interpolated) => (
        <div style={{ position: "relative", flex: 1 }}>
          {interpolated.map(({ key, style, data }) => (
            <div
              key={key}
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                bottom: 0,
                right: 0,
                display: "flex",
                ...style,
              }}
            >
              {data}
            </div>
          ))}
        </div>
      )}
    </TransitionMotion>
  )
}

export default Transition
