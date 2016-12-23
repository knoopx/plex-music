import React from 'react'

export default class View extends React.PureComponent {
  static propTypes = {
    flow: React.PropTypes.oneOf(['row', 'column']).isRequired,
  }

  static defaultProps = {
    flow: 'row',
  }

  static childContextTypes = {
    flow: React.PropTypes.oneOf(['row', 'column']).isRequired,
  }

  getChildContext() {
    return {
      flow: this.props.flow,
    }
  }

  render() {
    const { flow, style, ...otherProps } = this.props
    return <div {...otherProps} style={{ ...style, display: 'flex', flexDirection: flow }} />
  }
}
