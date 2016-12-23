import React from 'react'
import { theme } from 'react-theme'

@theme('text')
export default class Text extends React.PureComponent {
  static propTypes = {
    bold: React.PropTypes.bool.isRequired,
    muted: React.PropTypes.bool.isRequired,
    italic: React.PropTypes.bool.isRequired,
    size: React.PropTypes.number,
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
