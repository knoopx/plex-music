import React from 'react'
import asyncQueue from 'async/queue'
import { Motion, spring } from 'react-motion'
import { observable, action } from 'mobx'
import { inject, observer } from 'mobx-react'
import { Spinner } from 'ui'

import MusicIcon from 'react-icons/lib/fa/music'

const queue = asyncQueue((src, done) => {
  if (src) {
    const img = new Image()
    img.onload = () => done(null, src)
    img.onerror = err => done(err)
    img.src = src
  }
}, 8)

function Container({ size, borderColor, ...otherProps }) {
  return <div {...otherProps} style={{ display: 'flex', overflow: 'hidden', alignItems: 'center', justifyContent: 'center', width: size, height: size, borderRadius: 4, border: `1px solid ${borderColor}` }} />
}

@inject('theme')
@observer
export default class Artwork extends React.Component {
  @observable isLoading = false
  @observable src;

  componentWillMount() {
    if (this.props.src) {
      this.setIsLoading(true)
      queue.unshift(this.props.src, (err, src) => {
        if (!err) { this.setSrc(src) }
        this.setIsLoading(false)
      })
    }
  }

  @action setSrc(value) {
    this.src = value
  }

  @action setIsLoading(value) {
    this.isLoading = value
  }

  render() {
    const { size, theme } = this.props
    const innerSize = size * 0.5

    if (this.isLoading) {
      return (
        <Container size={size} borderColor={theme.borderColor}>
          <Spinner size={innerSize} color={theme.borderColor} />
        </Container>
      )
    }

    if (this.src) {
      return (
        <Container size={size} borderColor={theme.borderColor}>
          <Motion defaultStyle={{ opacity: 0 }} style={{ opacity: spring(1) }}>
            {style => <img style={{ width: size, height: size, ...style }} src={this.src} />}
          </Motion>
        </Container>
      )
    }

    return (
      <Container size={size} borderColor={theme.borderColor}>
        <MusicIcon size={innerSize} color={theme.borderColor} />
      </Container>
    )
  }
}
