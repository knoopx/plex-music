import _ from "lodash"
import React, { useEffect } from "react"
import { findDOMNode } from "react-dom"
import mousetrap from "mousetrap"
import MediaQuery from "react-responsive"
import { action, observable } from "mobx"
import { inject, observer } from "mobx-react"
import { FaSearch, FaTimesCircle } from "react-icons/fa"

import { Text, Frame, Spinner, FauxInput } from "ui"

const FilterGroup = (props) => {
  useEffect(() => {
    mousetrap.bind("command+f", focusInput)

    return () => {
      mousetrap.unbind("command+f", focusInput)
    }
  }, [])

  const isFocused = observable(false)

  const focusInput = () => {
    input.focus()
    input.select()
  }

  const onKeyDown = (e) => {
    if (e.key === "Escape") {
      e.target.blur()
    }
  }

  const setIsFocused = (value) => {
    isFocused = value
  }

  const setInput = (el) => {
    input = findDOMNode(el)
  }

  const { className, store } = props
  const shouldDisplayClearIcon = !_.isEmpty(store.albumStore.query)

  return (
    <Frame
      className={["bg-white flex items-center px-4", className]}
      onClick={focusInput}
    >
      {store.albumStore.isFiltering ? (
        <Spinner size={14} />
      ) : (
        <FaSearch size={14} />
      )}
      <FauxInput
        ref={setInput}
        className="ml-2"
        placeholder="Search..."
        value={store.albumStore.query}
        onKeyDown={onKeyDown}
        onChange={(e) => {
          store.albumStore.setQuery(e.target.value)
        }}
        onFocus={() => {
          setIsFocused(true)
        }}
        onBlur={() => {
          setIsFocused(false)
        }}
      />
      <Text muted italic size={12} style={{ whiteSpace: "nowrap" }}>
        {store.albumStore.matches.length} albums(s)
      </Text>
      {shouldDisplayClearIcon && (
        <FaTimesCircle
          size={16}
          color="#888"
          onClick={store.albumStore.clearFilter}
        />
      )}
    </Frame>
  )
}

export default inject("store")(observer(FilterGroup))
