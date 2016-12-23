import React from 'react'

import { inject } from 'mobx-react'

@inject('theme')
export default class Divider extends React.PureComponent {
  static contextTypes = {
    flow: React.PropTypes.string.isRequired,
  }

  static propTypes = {
    size: React.PropTypes.number.isRequired,
  }

  static defaultProps = {
    size: 1,
  }

  render() {
    const { theme } = this.props

    const styles = {
      row: { width: this.props.size },
      column: { height: this.props.size },
    }

    return (
      <div style={{ backgroundColor: theme.borderColor, ...styles[this.context.flow] }} />
    )
  }
}
