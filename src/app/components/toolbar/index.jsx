import React from 'react'

export default class Toolbar extends React.PureComponent {
  render() {
    const { ...props } = this.props
    return (
      <div
        className="flex items-center p-2 justify-between frame bg-gradient"
        {...props}
      />
    )
  }
}
