import React from 'react'
import PropTypes from 'prop-types'
import { theme } from 'ui/theming'

@theme('divider')
export default class Divider extends React.PureComponent {
  static contextTypes = {
    flow: PropTypes.string.isRequired,
  }

  static propTypes = {
    color: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired,
  }

  render() {
    const { color, size } = this.props

    const styles = {
      row: { width: size },
      column: { height: size },
    }

    return (
      <div style={{ backgroundColor: color, ...styles[this.context.flow] }} />
    )
  }
}
