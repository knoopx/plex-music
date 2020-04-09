import React from 'react'
import PropTypes from 'prop-types'
import {MdStar, MdStarBorder} from 'react-icons/md'

import { theme } from 'ui/theming'

@theme('rating')
export default class Rating extends React.PureComponent {
  static propTypes = {
    value: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    size: PropTypes.number.isRequired,
    stars: PropTypes.number,
    onChange: PropTypes.func.isRequired,
  }

  static defaultProps = {
    value: 0,
    max: 10,
    stars: 5,
  }

  renderStar(index) {
    const { size, max, stars, value, style } = this.props // eslint-disable-line react/prop-types
    const IconName = index / stars * max <= value - 1 ? MdStar : MdStarBorder

    return (
      <IconName
        key={index}
        onClick={(e) => {
          e.stopPropagation()
          this.props.onChange(index / stars * max + 1)
        }}
        style={{ margin: 2, cursor: 'pointer', ...style }}
        size={size}
      />
    )
  }

  render() {
    const { stars } = this.props
    return (
      <div>
        {Array.from(Array(stars).keys()).map(index => this.renderStar(index))}
      </div>
    )
  }
}
