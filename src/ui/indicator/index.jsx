import PropTypes from 'prop-types'
import React from 'react'

export default class Indicator extends React.PureComponent {
  static propTypes = {
    active: PropTypes.bool.isRequired,
    size: PropTypes.number.isRequired,
  }

  static defaultProps = {
    active: false,
    size: 8,
  }

  render() {
    return (
      <div style={{ borderRadius: 99999, width: this.props.size, height: this.props.size, backgroundColor: this.props.active ? 'blue' : 'red' }} />
    )
  }
}
