import React from 'react'

export default class FauxInput extends React.PureComponent {
  render() {
    const { style, ...props } = this.props
    return (
      <input
        style={{
          lineHeight: 1,
          fontSize: 'inherit',
          color: 'currentColor',
          backgroundColor: 'transparent',
          border: 'none',
          outline: 'none',
          margin: 0,
          padding: 0,
          ...style,
        }}
        {...props}
      />
    )
  }
}
