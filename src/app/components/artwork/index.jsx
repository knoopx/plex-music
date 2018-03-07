import React from 'react'
import PropTypes from 'prop-types'
import asyncQueue from 'async/queue'
import { Motion, spring } from 'react-motion'
import { observable, action } from 'mobx'
import { observer } from 'mobx-react'
import { Spinner } from 'ui'
import { theme } from 'ui/theming'

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
  return (
    <div
      {...otherProps}
      style={{
        display: 'flex',
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        width: size,
        height: size,
        borderRadius: 4,
        border: `1px solid ${borderColor}`,
      }}
    />
  )
}

@theme('artwork')
@observer
export default class Artwork extends React.Component {
  static defaultProps = {
    src: '',
  }

  static propTypes = {
    src: PropTypes.string,
    size: PropTypes.number.isRequired,
    borderColor: PropTypes.string.isRequired,
  }

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
        <MusicIcon size={innerSize} color={borderColor} />
      </Container>
    )
  }
}
