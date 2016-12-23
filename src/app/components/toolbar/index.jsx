import React from 'react'
import { View } from 'ui'
import { theme } from 'react-theme'

@theme('toolbar')
export default class Toolbar extends React.Component {
  render() {
    const { style, ...props } = this.props
    return (
      <View
        flow="row" style={{ padding: 8, ...style }} {...props}
      />
    )
  }
}
