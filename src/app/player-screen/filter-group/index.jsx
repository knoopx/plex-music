import _ from 'lodash'
import React from 'react'
import mousetrap from 'mousetrap'
import classNames from 'classnames/bind'
import MediaQuery from 'react-responsive'
import { autobind } from 'core-decorators'
import { action, observable } from 'mobx'
import { inject, observer } from 'mobx-react'

import SearchIcon from 'react-icons/lib/fa/search'
import ClearIcon from 'react-icons/lib/fa/times-circle'

import { Text, View, Spinner } from 'ui'
import { Gutter } from 'ui/layout'

import styles from './filter-group.css'

const className = classNames.bind(styles)

@inject('theme')
@inject('albumStore')
@autobind
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

  @action setIsFocused(value) {
    this.isFocused = value
  }

  render() {
    const { albumStore, theme } = this.props
    const shouldDisplayClearIcon = !_.isEmpty(albumStore.query)

    return (
      <View flow="row" className={className('default', { focused: this.isFocused })} style={{ flex: 3, alignItems: 'center', padding: '0 8px' }} onClick={this.focusInput}>
        {albumStore.isFiltering ? <Spinner size={14} /> : <SearchIcon size={14} />}
        <Gutter size={8} />
        <input
          ref={(el) => { this.input = el }}
          placeholder="Search..."
          className={styles.input}
          value={albumStore.query}
          onKeyDown={this.onKeyDown}
          onChange={(e) => { albumStore.setQuery(e.target.value) }}
          onFocus={() => { this.setIsFocused(true) }}
          onBlur={() => { this.setIsFocused(false) }}
        />
        <MediaQuery minWidth={1200}>
          <Gutter />
          <Text style={{ fontStyle: 'italic', color: theme.textMutedColor, whiteSpace: 'nowrap' }}>{albumStore.matches.length} albums(s)</Text>
        </MediaQuery>
        {shouldDisplayClearIcon && <Gutter />}
        {shouldDisplayClearIcon && <ClearIcon size={16} color="#888" onClick={albumStore.clearFilter} />}
      </View>
    )
  }
}
