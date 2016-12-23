import React from 'react'
import { theme } from 'react-theme'

@theme('button')
export default class Button extends React.PureComponent {
  static propTypes = {
    active: React.PropTypes.bool.isRequired,
    style: React.PropTypes.object,
    activeStyle: React.PropTypes.object,
  }

  static defaultProps = {
    active: false,
  }

  render() {
    const { active, style, activeStyle, ...props } = this.props

    return (
      <button
        style={{
          border: 'none',
          color: 'currentColor',
          outline: 'none',
          borderRadius: 2,
          ...style,
          ...(active && activeStyle),
        }} {...props}
      />
    )
  }
}
