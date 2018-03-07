import React from 'react'
import { Motion, spring } from 'react-motion'
import { theme } from 'ui/theming'
import View from '../layout/view'

@theme('touchableOpacity')
export default class TouchableOpacity extends React.PureComponent {
  state = {
    isMouseDown: false,
  }

  componentWillMount() {
    this.onMouseDown = this.onMouseDown.bind(this)
    this.onMouseUp = this.onMouseUp.bind(this)
    window.addEventListener('mouseup', this.onMouseUp)
  }

  componentWillUnmount() {
    clearTimeout(this.timeout)
    window.removeEventListener('mouseup', this.onMouseUp)
  }

  onMouseDown() {
    this.setState({ isMouseDown: true })
  }

  onMouseUp() {
    this.timeout = setTimeout(() => {
      this.setState({ isMouseDown: false })
    }, 200)
  }

  render() {
    const { style, ...props } = this.props

    return (
      <View style={{ ...style }} onMouseDown={this.onMouseDown}>
        <Motion
          defaultStyle={{ opacity: 1 }}
          style={{ opacity: spring(this.state.isMouseDown ? 0.25 : 1) }}
        >
          {animatedStyle => (
            <View {...props} style={{ flex: 1, ...animatedStyle }} />
          )}
        </Motion>
      </View>
    )
  }
}
