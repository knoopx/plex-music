import _ from 'lodash'
import React from 'react'
import { findDOMNode } from 'react-dom'
import mousetrap from 'mousetrap'
import MediaQuery from 'react-responsive'

import { action, observable } from 'mobx'
import { inject, observer } from 'mobx-react'

import { FaSearch, FaTimesCircle } from 'react-icons/fa'

import { Text, Frame, Spinner, FauxInput } from 'ui'

@inject('store')
@observer
export default class FilterGroup extends React.Component {
  @observable isFocused = false

  componentDidMount() {
    mousetrap.bind('command+f', this.focusInput)
  }

  componentWillUnmount() {
    mousetrap.unbind('command+f', this.focusInput)
  }

  focusInput() {
    this.input.focus()
    this.input.select()
  }

  onKeyDown(e) {
    if (e.key === 'Escape') {
      e.target.blur()
    }
  }

  @action
  setIsFocused(value) {
    this.isFocused = value
  }

  setInput(el) {
    this.input = findDOMNode(el)
  }

  render() {
    const { className, store } = this.props
    const shouldDisplayClearIcon = !_.isEmpty(store.albumStore.query)

    return (
      <Frame
        className={['bg-white flex items-center px-4', className]}
        style={{
          ...(this.isFocused && focusStyle),
        }}
        onClick={this.focusInput}
      >
        {store.albumStore.isFiltering ? (
          <Spinner size={14} />
        ) : (
          <FaSearch size={14} />
        )}
        <FauxInput
          ref={this.setInput}
          className="ml-2"
          placeholder="Search..."
          value={store.albumStore.query}
          onKeyDown={this.onKeyDown}
          onChange={e => {
            store.albumStore.setQuery(e.target.value)
          }}
          onFocus={() => {
            this.setIsFocused(true)
          }}
          onBlur={() => {
            this.setIsFocused(false)
          }}
        />
        <Text muted italic size={12} style={{ whiteSpace: 'nowrap' }}>
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
}
