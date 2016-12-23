import React from 'react'
import style from './input.css'

export default class Input extends React.PureComponent {
  render() {
    return (
      <input {...this.props} className={style.default} />
    )
  }
}
