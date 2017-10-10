// @flow

import PropTypes from 'prop-types'
import React from 'react'
import StarIcon from 'react-icons/lib/fa/star'
import OpenStarIcon from 'react-icons/lib/fa/star-o'

import { theme } from 'ui/theming'

@theme('rating')
export default class Rating extends React.PureComponent {
  static propTypes = {
    value: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
  }

  static defaultProps = {
    value: 0,
    max: 10,
    stars: 5,
  }

  renderStar(index: number) {
    const { size, max, stars, value, style } = this.props
    const IconName = (index / stars * max) <= value - 1 ? StarIcon : OpenStarIcon

    return (
      <IconName
        key={index}
        onClick={(e) => { e.stopPropagation(); this.props.onChange((index / stars * max) + 1) }}
        style={{ margin: 2, cursor: 'pointer', ...style }}
        size={size}
      />
    )
  }

  render() {
    const { stars } = this.props
    return <div>{Array.from(Array(stars).keys()).map(index => this.renderStar(index))}</div>
  }
}
