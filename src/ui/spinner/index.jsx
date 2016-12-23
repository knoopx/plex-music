import React from 'react'
import { inject } from 'mobx-react'

import styles from './spinner.css'

@inject('theme')
export default class Spinner extends React.PureComponent {
  static propTypes ={
    size: React.PropTypes.number.isRequired,
    color: React.PropTypes.string,
  }

  static defaultProps = {
    size: 64,
  }

  render() {
    const { size, color, theme } = this.props

    const style = {
      backgroundColor: color || theme.primaryBackgroundColor,
    }

    return (
      <div className={styles.spinner} style={{ width: size, height: size }}>
        <div className={styles.first} style={style} />
        <div className={styles.second} style={style} />
        <div className={styles.third} style={style} />
      </div>
    )
  }
}
