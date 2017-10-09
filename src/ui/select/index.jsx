import React from 'react'
import { theme } from 'ui/theming'

@theme('select')
export default class Select extends React.PureComponent {
  render() {
    const { style, ...props } = this.props
    return (
      <select
        {...props}
        style={{
 ...style,
          color: 'inherit',
          WebkitAppearance: 'none',
          border: 'none',
          outline: 'none',
          borderRadius: '2px',
          alignItems: 'center',
          padding: '0 8px',
        }}
      />
    )
  }
}
