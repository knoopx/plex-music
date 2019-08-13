import PropTypes from "prop-types"
import React from "react"
import { MdStar, MdStarBorder } from "react-icons/md"

const Rating = ({ size, value, max, stars, className, style, onChange }) => {
  return (
    <div className={["flex", className]}>
      {Array.from(Array(stars).keys()).map((index) => {
        const IconName =
          (index / stars) * max <= value - 1 ? MdStar : MdStarBorder

        return (
          <IconName
            key={index}
            onClick={(e) => {
              e.stopPropagation()
              onChange((index / stars) * max + 1)
            }}
            className="cursor-pointer mr-1"
            size={size}
          />
        )
      })}
    </div>
  )
}

Rating.defaultProps = {
  value: 0,
  max: 10,
  stars: 5,
  size: 18,
}

Rating.propTypes = {
  value: PropTypes.number,
  max: PropTypes.number,
  stars: PropTypes.number,
  size: PropTypes.number,
  onChange: PropTypes.func.isRequired,
}

export default Rating
