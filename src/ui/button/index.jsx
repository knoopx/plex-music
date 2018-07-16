import PropTypes from 'prop-types'
import React from 'react'

export default class Button extends React.PureComponent {
  static propTypes = {
    active: PropTypes.bool.isRequired,
    style: PropTypes.object,
    activeStyle: PropTypes.object,
  }

  static defaultProps = { active: false }

  render() {
    const { active, className, ...props } = this.props

    return (
      <button
        className={['bg-grey-lighter frame outline-none', className]}
        {...props}
      />
    )
  }
}
