import _ from "lodash"
import React, { useEffect, useState, useRef } from "react"
import mousetrap from "mousetrap"
import { inject, observer } from "mobx-react"
import { MdSearch, MdClear } from "react-icons/md"

import { Text, Frame, Spinner, FauxInput } from "ui"

const FilterGroup = (props) => {
  const input = useRef()
  const { className, store } = props

  const focusInput = () => {
    input.current.focus()
    input.current.select()
  }

  useEffect(() => {
    mousetrap.bind("command+f", focusInput)

    return () => {
      mousetrap.unbind("command+f", focusInput)
    }
  }, [])

  const onKeyDown = (e) => {
    if (e.key === "Escape") {
      e.target.blur()
    }
  }

  const shouldDisplayClearIcon = !_.isEmpty(store.albumStore.query)

  return (
    <Frame
      className={["flex items-center px-4 bg-white", className]}
      onClick={focusInput}
    >
      {store.albumStore.isFiltering ? (
        <Spinner size={14} />
      ) : (
        <MdSearch size={14} />
      )}
      <FauxInput
        ref={input}
        className="ml-2"
        placeholder="Search..."
        value={store.albumStore.query}
        onKeyDown={onKeyDown}
        onChange={(e) => {
          store.albumStore.setQuery(e.target.value)
        }}
      />
      <Text muted italic size={12} style={{ whiteSpace: "nowrap" }}>
        {store.albumStore.matches.length} albums(s)
      </Text>
      {shouldDisplayClearIcon && (
        <MdClear
          size={16}
          color="#888"
          onClick={store.albumStore.clearFilter}
        />
      )}
    </Frame>
  )
}

export default inject("store")(observer(FilterGroup))
