import React from 'react'
import { theme } from 'ui/theming'

@theme('badge')
export default class Badge extends React.PureComponent {
  render() {
    return (
      <div
        style={{
          textAlign: 'center',
          minWidth: 32,
          padding: '2px 8px',
          borderRadius: 999999,
        }}
        {...this.props}
      />
    )
  }
}
