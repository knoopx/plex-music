import PropTypes from 'prop-types'
import React from 'react'

export default class Spinner extends React.PureComponent {
  static propTypes = {
    size: PropTypes.number.isRequired,
  }

  render() {
    const { size } = this.props

    return (
      <div className="spinner" style={{ width: size, height: size }}>
        <div className="spinner-bar" />
        <div className="spinner-bar" />
        <div className="spinner-bar" />
      </div>
    )
  }
}
