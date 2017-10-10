import React from 'react'

export default class FauxInput extends React.PureComponent {
  render() {
    const { style, ...props } = this.props // eslint-disable-line react/prop-types
    return (
      <input
        style={{
          ...style,
          lineHeight: 1,
          fontSize: 'inherit',
          color: 'currentColor',
          backgroundColor: 'transparent',
          border: 'none',
          outline: 'none',
          margin: 0,
          padding: 0,
        }}
        {...props}
      />
    )
  }
}
