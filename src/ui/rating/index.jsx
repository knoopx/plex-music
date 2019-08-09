import PropTypes from "prop-types"
import React from "react"
import { FaStar, FaStarO } from "react-icons/fa"

const Rating = ({
  size,
  value = 0,
  max = 10,
  stars = 5,
  className,
  style,
  onChange,
}) => {
  return (
    <div className={[className]}>
      {Array.from(Array(stars).keys()).map((index) => {
        const IconName = (index / stars) * max <= value - 1 ? FaStar : FaStarO

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

Rating.propTypes = {
  value: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default Rating
