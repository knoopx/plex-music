import PropTypes from 'prop-types'
import React from 'react'
import { theme } from 'ui/theming'

@theme('progressBar', {
  height: 20,
  color: PropTypes.string.isRequired,
  borderColor: PropTypes.string.isRequired,
})

export default class ProgressBar extends React.PureComponent {
  static propTypes = {
    progress: PropTypes.number.isRequired,
  }

  static defaultProps = {
    progress: 0,
  }

  render() {
    const { progress, theme } = this.props
    const { height, color, borderColor } = theme

    return (
      <div style={{ border: `1px solid ${borderColor}`, flex: 1, padding: 2, minWidth: 100, height, borderRadius: 3 }}>
        <div style={{ display: 'flex', width: `${progress * 100}%`, height: '100%', backgroundColor: color, borderRadius: 2, color: 'white' }} />
      </div>
    )
  }
}
