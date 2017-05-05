import PropTypes from 'prop-types'
import React from 'react'

import styles from './spinner.css'

import { theme } from 'react-theme'

@theme('spinner')
export default class Spinner extends React.PureComponent {
  static propTypes = {
    size: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
  }

  render() {
    const { size, color } = this.props

    const barStyle = {
      backgroundColor: color,
    }

    return (
      <div className={styles.spinner} style={{ width: size, height: size }}>
        <div className={styles.first} style={barStyle} />
        <div className={styles.second} style={barStyle} />
        <div className={styles.third} style={barStyle} />
      </div>
    )
  }
}
