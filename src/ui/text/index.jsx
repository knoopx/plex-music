import PropTypes from 'prop-types'
import React from 'react'
import { theme } from 'ui/theming'

@theme('text')
export default class Text extends React.PureComponent {
  static propTypes = {
    bold: PropTypes.bool,
    muted: PropTypes.bool,
    italic: PropTypes.bool,
    size: PropTypes.number,
    style: PropTypes.object, // eslint-disable-line react/forbid-prop-types, react/forbid-prop-types
    mutedStyle: PropTypes.object, // eslint-disable-line react/forbid-prop-types, react/forbid-prop-types
  }

  static defaultProps = {
    bold: false,
    muted: false,
    italic: false,
    size: 16,
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
