import PropTypes from "prop-types"
import React, { useEffect, useState, useRef } from "react"

const VirtualList = ({ items, itemHeight, children, bufferSize }) => {
  const container = useRef()
  const [clientHeight, setClientHeight] = useState(0)
  const [scrollTop, setScrollTop] = useState(0)

  const onScroll = (e) => {
    setScrollTop(e.target.scrollTop)
  }

  useEffect(() => {
    if (container.current) {
      setScrollTop(container.current.scrollTop)
      setClientHeight(container.current.clientHeight)
    }
  }, [container])

  useEffect(() => {
    if (container.current) {
      setScrollTop(container.current.scrollTop)
      setClientHeight(container.current.clientHeight)
    }
  }, [])

  const totalHeight = itemHeight * items.length

  const visibleItemsCount = Math.ceil(clientHeight / itemHeight) + 1

  // console.log({ clientHeight, itemHeight, visibleItemsCount })

  const firstItemIndex = Math.floor(scrollTop / itemHeight)

  const firstVisibleItemIndex = Math.max(0, firstItemIndex - bufferSize)

  const lastVisibleItemIndex = Math.min(
    firstItemIndex + bufferSize + visibleItemsCount,
    items.length,
  )

  const visibleItemsOffsetY = Math.min(
    firstVisibleItemIndex * itemHeight,
    totalHeight,
  )

  const visibleItems = items.slice(firstVisibleItemIndex, lastVisibleItemIndex)

  return (
    <div
      style={{
        display: "flex",
        flex: 1,
        flexDirection: "row",
        overflow: "hidden",
        WebkitAppRegion: "no-drag",
      }}
    >
      <div
        ref={container}
        style={{
          flex: 1,
          flexDirection: "column",
          maxWidth: "100%",
          overflowY: "overlay",
        }}
        onScroll={onScroll}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            height: totalHeight - visibleItemsOffsetY,
            transform: `translateY(${visibleItemsOffsetY}px)`,
            overflow: "hidden",
            contain: "paint",
          }}
        >
          {visibleItems.map(children)}
        </div>
      </div>
    </div>
  )
}

VirtualList.defaultProps = {
  bufferSize: 0,
}

VirtualList.propTypes = {
  items: PropTypes.array.isRequired,
  itemHeight: PropTypes.number.isRequired,
  children: PropTypes.func.isRequired,
  bufferSize: PropTypes.number,
}

export default VirtualList
