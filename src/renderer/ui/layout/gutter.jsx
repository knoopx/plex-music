import PropTypes from 'prop-types'
import React from 'react'

export default class Gutter extends React.PureComponent {
  static contextTypes = {
    flow: PropTypes.string.isRequired,
  }

  static propTypes = {
    size: PropTypes.number,
  }

  static defaultProps = {
    size: 16,
  }

  render() {
    const styles = {
      row: { width: this.props.size },
      column: { height: this.props.size },
    }

    return <div style={styles[this.context.flow]} />
  }
}
