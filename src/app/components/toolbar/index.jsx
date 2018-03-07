import React from 'react'
import { View } from 'ui'
import { theme } from 'ui/theming'

@theme('toolbar')
export default class Toolbar extends React.PureComponent {
  render() {
    const { style, ...props } = this.props
    return (
      <View
        flow="row"
        style={{
          padding: 8,
          alignItems: 'center',
          justifyContent: 'space-between',
          ...style,
        }}
        {...props}
      />
    )
  }
}
