import React from 'react'
import { inject } from 'mobx-react'

@inject('theme')
export default class StatusIndicator extends React.Component {
  static propTypes = {
    active: React.ProptTypes.bool.isRequired,
    size: React.ProptTypes.number.isRequired,
  }

  static defaultProps = {
    active: false,
    size: 8,
  }

  render() {
    const { theme } = this.props
    return (
      <div style={{ borderRadius: 99999, width: this.props.size, height: this.props.size, backgroundColor: this.props.active ? theme.positiveColor : theme.negativeColor }} />
    )
  }
}
