import PropTypes from 'prop-types'
import React from 'react'
import { FaStar, FaStarO } from 'react-icons/fa'

// import FaStar from '@fortawesome/fontawesome-free/svgs/regular/star.svg'

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

  renderStar(index) {
    const { size, max, stars, value, style } = this.props
    const IconName = (index / stars) * max <= value - 1 ? FaStar : FaStarO

    return (
      <IconName
        key={index}
        onClick={(e) => {
          e.stopPropagation()
          this.props.onChange((index / stars) * max + 1)
        }}
        className="mr-1 cursor-pointer"
        size={size}
      />
    )
  }

  render() {
    const { stars, className } = this.props
    return (
      <div className={[className]}>
        {Array.from(Array(stars).keys()).map(index => this.renderStar(index))}
      </div>
    )
  }
}
