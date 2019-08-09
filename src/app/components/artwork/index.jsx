import React, { useEffect, useState } from "react"
import asyncQueue from "async/queue"
import { Motion, spring } from "react-motion"
import { MdMusicNote } from "react-icons/md"

import { Spinner } from "ui"

const queue = asyncQueue((src, done) => {
  if (src) {
    const img = new Image()
    img.onload = () => done(null)
    img.onerror = (err) => done(err)
    img.src = src
  }
}, 8)

function Container({ size, borderColor, ...otherProps }) {
  return (
    <div
      {...otherProps}
      className="flex flex-none overflow-hidden items-center justify-center border rounded text-grey-light"
      style={{ width: size, height: size }}
    />
  )
}

const Artwork = (props) => {
  const { src, size, borderColor } = props
  const [isLoading, setIsLoading] = useState(false)

  const innerSize = size * 0.5

  useEffect(() => {
    if (src) {
      setIsLoading(true)
      queue.unshift(src, (err) => {
        if (!err) {
          setIsLoading(false)
        }
        setIsLoading(false)
      })
    }
  }, [])

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
      <MdMusicNote size={innerSize} color={borderColor} />
    </Container>
  )
}

export default Artwork
