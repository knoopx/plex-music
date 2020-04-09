import React from 'react'
import { theme } from 'ui/theming'

@theme('select')
export default class Input extends React.PureComponent {
  render() {
    const { style, ...props } = this.props
    return (
      <input
        {...props}
        style={{
          ...style,
          color: 'inherit',
          WebkitAppearance: 'none',
          border: 'none',
          outline: 'none',
          borderRadius: '2px',
          alignItems: 'center',
          padding: '4px 8px',
        }}
      />
    )
  }
}
