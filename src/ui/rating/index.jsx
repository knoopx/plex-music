import React from 'react'
import StarIcon from 'react-icons/lib/fa/star'
import OpenStarIcon from 'react-icons/lib/fa/star-o'

import { theme } from 'react-theme'

@theme('rating')
export default class Rating extends React.PureComponent {
  static propTypes = {
    value: React.PropTypes.number.isRequired,
    max: React.PropTypes.number.isRequired,
    onChange: React.PropTypes.func.isRequired,
  }

  static defaultProps = {
    value: 0,
    max: 5,
  }

  renderStar(index: number) {
    const { size, value, style } = this.props

    const IconName = index <= value - 1 ? StarIcon : OpenStarIcon
    return (
      <IconName
        key={index}
        onClick={(e) => { e.stopPropagation(); this.props.onChange(index + 1) }}
        style={{ margin: 2, ...style }}
        size={size}
      />
    )
  }

  render() {
    const { max } = this.props
    const stars = Array.from(Array(max).keys())
    return <div>{stars.map(index => this.renderStar(index))}</div>
  }
}
