import React from 'react'

export default class Badge extends React.PureComponent {
  render() {
    const { ...props } = this.props
    return (
      <div
        style={{
          textAlign: 'center',
          minWidth: 32,
          padding: '2px 8px',
          borderRadius: 999999,
        }}
        {...props}
      />
    )
  }
}
