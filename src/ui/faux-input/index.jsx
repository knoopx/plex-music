import React from 'react'

export default class FauxInput extends React.PureComponent {
  render() {
    const { className, style, ...props } = this.props
    return (
      <input
        className={['flex-auto bg-transparent input-reset outline-none', className]}
        {...props}
      />
    )
  }
}
