import React from 'react'
import PropTypes from 'prop-types'
import { theme } from 'ui/theming'

export default class ProgressBar extends React.PureComponent {
  static propTypes = {
    progress: PropTypes.number,
    height: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
    borderColor: PropTypes.string.isRequired,
  }

  static defaultProps = {
    progress: 0,
  }

  render() {
    const { progress, borderColor, height, color } = this.props

    return (
      <div
        style={{
          border: `1px solid ${borderColor}`,
          flex: 1,
          padding: 2,
          minWidth: 100,
          height,
          borderRadius: 3,
        }}
      >
        <div
          style={{
            display: 'flex',
            width: `${progress * 100}%`,
            height: '100%',
            backgroundColor: color,
            borderRadius: 2,
            color: 'white',
          }}
        />
      </div>
    )
  }
}
