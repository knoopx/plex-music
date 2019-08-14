import React, { useState } from "react"
import { useTransition, animated } from "react-spring"

const Fader = ({ style, ...props }) => {
  const [show, set] = useState(false)

  const transitions = useTransition(show, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  })

  return transitions.map(
    ({ item, key, props: spring }) =>
      item && (
        <animated.div key={key} style={{ style, ...spring }} {...props} />
      ),
  )
}

export default Fader
