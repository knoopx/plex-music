import React from 'react'
import { theme } from 'react-theme'
@theme('indicator', {
  color: React.PropTypes.string,
  activeColor: React.PropTypes.string,
})
export default class Indicator extends React.Component {
  static propTypes = {
    active: React.PropTypes.bool.isRequired,
    size: React.PropTypes.number.isRequired,
    theme: React.PropTypes.shape({
      color: React.PropTypes.string.isRequired,
      activeColor: React.PropTypes.string.isRequired,
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
