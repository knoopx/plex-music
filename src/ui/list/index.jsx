import PropTypes from "prop-types"
import React from "react"
import { observer } from "mobx-react"

const List = ({
  selected,
  onSelect = () => {},
  items,
  renderItem,
  style,
  ...props
}) => {
  return (
    <div style={{ ...style, WebkitAppRegion: "no-drag" }} {...props}>
      {items.map((item, index) => {
        const isActive = items.includes(item) && selected === item
        return (
          <div key={index} onClick={() => onSelect(item)}>
            {renderItem(item, index, isActive)}
          </div>
        )
      })}
    </div>
  )
}

List.propTypes = {
  items: PropTypes.array.isRequired,
  selected: PropTypes.object,
  renderItem: PropTypes.func.isRequired,
  onSelect: PropTypes.func,
}

export default observer(List)
