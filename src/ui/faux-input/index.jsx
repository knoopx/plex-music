import React from 'react'

export default function FauxInput({ style, ...props }) {
  return (
    <input
      style={{
        lineHeight: 1,
        color: 'currentColor',
        backgroundColor: 'transparent',
        border: 'none',
        outline: 'none',
        margin: 0,
        padding: 0,
        ...style,
      }}
      {...props}
    />)
}
