import PropTypes from 'prop-types'
import React from 'react'
import { theme } from 'react-theme'

@theme('text')
export default class Text extends React.PureComponent {
  static propTypes = {
    bold: PropTypes.bool.isRequired,
    muted: PropTypes.bool.isRequired,
    italic: PropTypes.bool.isRequired,
    size: PropTypes.number,
  }

  static defaultProps = {
    bold: false,
    muted: false,
    italic: false,
  }

  render() {
    const { muted, bold, italic, size, style, mutedStyle, ...props } = this.props

    return (
      <span
        {...props}
        style={{
          fontSize: size,
          fontStyle: italic && 'italic',
          fontWeight: bold && 'bold',
          ...style,
          ...(muted && mutedStyle),
        }}
      />
    )
  }
}
