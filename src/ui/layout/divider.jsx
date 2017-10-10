import PropTypes from 'prop-types'
import React from 'react'
import { theme } from 'ui/theming'

@theme('divider')
export default class Divider extends React.PureComponent {
  static contextTypes = {
    flow: PropTypes.string.isRequired,
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
