// @flow

import React from 'react'
import mousetrap from 'mousetrap'
import PlayListView from './play-list-view'
import AlbumListView from './album-list-view'
import PlayerView from './player-view'
import EjectIcon from 'react-icons/lib/fa/eject'

import { inject, observer } from 'mobx-react'
import { View, Button, Gutter, Divider, Select } from 'ui'
import { Toolbar } from 'app/components'
import FilterGroup from './filter-group'
import OrderButtonGroup from './order-button-group'
import LightIcon from 'react-icons/lib/md/lightbulb-outline'

@inject('appState')
@inject('albumStore')
@observer
export default class PlayerScreen extends React.PureComponent {
  componentWillMount() {
    mousetrap.bind('command+r', this.refresh)
  }

  componentWillUnmount() {
    mousetrap.unbind('command+r', this.refresh)
  }

  refresh(e: SyntheticInputEvent) {
    this.props.albumStore.fetch(true)
    e.preventDefault()
  }

  render() {
    const { appState } = this.props

    return (
      <View flow="column" style={{ flex: 1 }}>
        <Toolbar>
          <View flow="row" style={{ flex: 1 }}>
            <Gutter size={70} />
            <FilterGroup />
            <Gutter size={4} />
            <Select value={appState.activeSectionIndex} onChange={appState.onChangeSection}>
              {appState.sections.map((section, index) => (
                <option key={section.id} value={index}>{section.name}</option>
              ))}
            </Select>
            <Gutter />
            <OrderButtonGroup />
          </View>
          <Gutter size={16} />
          <View flow="row" style={{ flex: 1 }}>
            <PlayerView />
            <Gutter size={16} />
            <Button active={appState.themeName === 'dark'} style={{ width: 48, height: 34 }} onClick={() => appState.setThemeName(appState.themeName === 'dark' ? 'light' : 'dark')}><LightIcon size={18} /></Button>
            <Gutter size={4} />
            <Button style={{ width: 48, height: 34 }} onClick={() => appState.disconnect()}><EjectIcon size={18} /></Button>
          </View>
        </Toolbar>
        <Divider />
        <View flow="row" style={{ flex: 1 }}>
          <AlbumListView />
          <Divider />
          <PlayListView />
        </View>
      </View>
    )
  }
}
