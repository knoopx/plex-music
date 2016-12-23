import React from 'react'
import { theme } from 'react-theme'

@theme('badge')
export default class Badge extends React.PureComponent {
  render() {
    const { theme, ...props } = this.props
    return (
      <div
        style={{
          textAlign: 'center',
          minWidth: 32,
          padding: '2px 8px',
          borderRadius: 999999,
          ...theme.style,
        }} {...props}
      />
    )
  }
}
