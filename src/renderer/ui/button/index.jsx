import PropTypes from 'prop-types'
import React from 'react'
import { theme } from 'ui/theming'

@theme('button')
export default class Button extends React.PureComponent {
  static propTypes = {
    active: PropTypes.bool.isRequired,
    style: PropTypes.object,
    activeStyle: PropTypes.object,
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
          fontSize: 'inherit',
          ...style,
          ...(active && activeStyle),
        }}
        {...props}
      />
    )
  }
}
