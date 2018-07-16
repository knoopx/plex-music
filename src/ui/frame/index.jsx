import React from 'react'

export default class Frame extends React.PureComponent {
  render() {
    const { className, ...props } = this.props
    return (
      <div className={['flex-auto frame', className]} {...props} />
    )
  }
}
