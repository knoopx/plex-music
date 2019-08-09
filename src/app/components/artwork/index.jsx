import React, { useEffect } from "react"
import asyncQueue from "async/queue"
import { Motion, spring } from "react-motion"
import { observable, action } from "mobx"
import { observer } from "mobx-react"
import { FaMusic } from "react-icons/fa"

import { Spinner } from "ui"

const queue = asyncQueue((src, done) => {
  if (src) {
    const img = new Image()
    img.onload = () => done(null, src)
    img.onerror = (err) => done(err)
    img.src = src
  }
}, 8)

function Container({ size, borderColor, ...otherProps }) {
  return (
    <div
      {...otherProps}
      className="border flex flex-none items-center justify-center overflow-hidden rounded text-grey-light"
      style={{ width: size, height: size }}
    />
  )
}

const Artwork = (props) => {
  useEffect(() => {
    if (props.src) {
      setIsLoading(true)
      queue.unshift(props.src, (err, src) => {
        if (!err) {
          setSrc(src)
        }
        setIsLoading(false)
      })
    }
  }, [])

  const src = observable()
  const isLoading = observable(false)

  const setSrc = (value) => {
    src = value
  }

  const setIsLoading = (value) => {
    isLoading = value
  }

  const { size, borderColor } = props
  const innerSize = size * 0.5

  if (isLoading) {
    return (
      <Container size={size} borderColor={borderColor}>
        <Spinner size={innerSize} color={borderColor} />
      </Container>
    )
  }

  if (src) {
    return (
      <Container size={size} borderColor={borderColor}>
        <Motion defaultStyle={{ opacity: 0 }} style={{ opacity: spring(1) }}>
          {(style) => (
            <img style={{ width: size, height: size, ...style }} src={src} />
          )}
        </Motion>
      </Container>
    )
  }

  return (
    <Container size={size} borderColor={borderColor}>
      <FaMusic size={innerSize} color={borderColor} />
    </Container>
  )
}

export default observer(Artwork)
