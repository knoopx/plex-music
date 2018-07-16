import PropTypes from 'prop-types'
import React from 'react'

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
    const { muted, bold, italic, size, className, ...props } = this.props

    return (
      <span
        className={[{
          italic,
          'font-bold': bold,
          'text-grey-dark': muted,
        }, className]}
        {...props}
      />
    )
  }
}
