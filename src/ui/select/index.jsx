import React from 'react'

export default class Select extends React.PureComponent {
  render() {
    const { className, ...props } = this.props
    return (
      <select
        className={['frame appearance-none rounded-none', className]}
        {...props}
      />
    )
  }
}
