import React from 'react'
import asyncQueue from 'async/queue'
import { Motion, spring } from 'react-motion'
import { observable, action } from 'mobx'
import { observer } from 'mobx-react'
import { Spinner } from 'ui'

import { FaMusic } from 'react-icons/fa'

const queue = asyncQueue((src, done) => {
  if (src) {
    const img = new Image()
    img.onload = () => done(null, src)
    img.onerror = err => done(err)
    img.src = src
  }
}, 8)

function Container({ size, borderColor, ...otherProps }) {
  return (
    <div
      {...otherProps}
      className="flex flex-none items-center justify-center overflow-hidden border text-grey-light rounded"
      style={{ width: size, height: size }}
    />
  )
}

@observer
export default class Artwork extends React.Component {
  @observable isLoading = false

  @observable src

  componentWillMount() {
    if (this.props.src) {
      this.setIsLoading(true)
      queue.unshift(this.props.src, (err, src) => {
        if (!err) {
          this.setSrc(src)
        }
        this.setIsLoading(false)
      })
    }
  }

  @action
  setSrc(value) {
    this.src = value
  }

  @action
  setIsLoading(value) {
    this.isLoading = value
  }

  render() {
    const { size, borderColor } = this.props
    const innerSize = size * 0.5

    if (this.isLoading) {
      return (
        <Container size={size} borderColor={borderColor}>
          <Spinner size={innerSize} color={borderColor} />
        </Container>
      )
    }

    if (this.src) {
      return (
        <Container size={size} borderColor={borderColor}>
          <Motion defaultStyle={{ opacity: 0 }} style={{ opacity: spring(1) }}>
            {style => (
              <img
                style={{ width: size, height: size, ...style }}
                src={this.src}
              />
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
}
