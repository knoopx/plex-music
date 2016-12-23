import React from 'react'
import classNames from 'classnames/bind'

import styles from './button.css'

const ctx = classNames.bind(styles)

export default class Button extends React.PureComponent {
  static propTypes = {
    active: React.PropTypes.bool.isRequired,
  }

  static defaultProps = {
    active: false,
  }

  render() {
    const { active, className, ...otherProps } = this.props
    return <button className={ctx('default', { active }, className)} {...otherProps} />
  }
}
