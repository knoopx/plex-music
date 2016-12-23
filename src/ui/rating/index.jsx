import React from 'react'
import StarIcon from 'react-icons/lib/fa/star'
import OpenStarIcon from 'react-icons/lib/fa/star-o'

export default class Rating extends React.PureComponent {
  static propTypes = {
    size: React.PropTypes.number.isRequired,
    value: React.PropTypes.number.isRequired,
    max: React.PropTypes.number.isRequired,
    color: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func.isRequired,
  }

  static defaultProps = {
    size: 18,
    value: 0,
    max: 5,
    color: 'black',
  }

  renderStar(index: number) {
    const { value, size, color } = this.props
    const IconName = index <= value - 1 ? StarIcon : OpenStarIcon
    return (
      <IconName
        key={index}
        onClick={(e) => { e.stopPropagation(); this.props.onChange(index + 1) }}
        style={{ margin: 2, color }}
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
