import PropTypes from 'prop-types'
import React from 'react'
import { theme } from 'react-theme'
@theme('indicator', {
  color: PropTypes.string,
  activeColor: PropTypes.string,
})
export default class Indicator extends React.PureComponent {
  static propTypes = {
    active: PropTypes.bool.isRequired,
    size: PropTypes.number.isRequired,
    theme: PropTypes.shape({
      color: PropTypes.string.isRequired,
      activeColor: PropTypes.string.isRequired,
    }).isRequired,
  }

  static defaultProps = {
    active: false,
    size: 8,
  }

  render() {
    const { theme } = this.props
    const { color, activeColor } = theme

    return (
      <div style={{ borderRadius: 99999, width: this.props.size, height: this.props.size, backgroundColor: this.props.active ? activeColor : color }} />
    )
  }
}
