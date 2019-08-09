import PropTypes from "prop-types"
import React, { useEffect } from "react"
import { observable, computed, action, runInAction } from "mobx"
import { observer } from "mobx-react"

const VirtualList = (props = { bufferSize: 0 }) => {
  useEffect(() => {
    setScrollTop(container.scrollTop)
    setClientHeight(container.clientHeight)
    window.addEventListener("resize", onResize)

    return () => {
      window.removeEventListener("resize", onResize)
    }
  }, [])

  const clientHeight = observable(0)
  const scrollTop = observable(0)

  const onResize = () => {
    if (container) {
      setClientHeight(container.clientHeight)
    }
  }

  const onScroll = (e) => {
    setScrollTop(e.target.scrollTop)
  }

  const setScrollTop = (value) => {
    scrollTop = value
  }

  const setClientHeight = (value) => {
    clientHeight = value
  }

  const setContainer = (container) => {
    if (container) {
      container = container
      runInAction(() => {
        setScrollTop(container.scrollTop)
        setClientHeight(container.clientHeight)
      })
    }
  }

  const scrollToTop = () => {
    if (container) {
      container.scrollTop = 0
      setScrollTop(0)
    }
  }

  const totalHeight = props.itemHeight * props.items.length

  const visibleItemsCount = Math.ceil(clientHeight / props.itemHeight) + 1

  const firstItemIndex = Math.floor(scrollTop / props.itemHeight)

  const firstVisibleItemIndex = Math.max(0, firstItemIndex - props.bufferSize)

  const lastVisibleItemIndex = Math.min(
    firstItemIndex + props.bufferSize + visibleItemsCount,
    props.items.length,
  )

  const visibleItemsOffsetY = Math.min(
    firstVisibleItemIndex * props.itemHeight,
    totalHeight,
  )

  const visibleItems = props.items.slice(
    firstVisibleItemIndex,
    lastVisibleItemIndex,
  )

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
        ref={setContainer}
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
          {visibleItems.map(props.renderItem)}
        </div>
      </div>
    </div>
  )
}

VirtualList.propTypes = {
  items: PropTypes.array.isRequired,
  itemHeight: PropTypes.number.isRequired,
  renderItem: PropTypes.func.isRequired,
  bufferSize: PropTypes.number.isRequired,
}

export default observer(VirtualList)
