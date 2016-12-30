// @flow

import React from 'react'
import PlayListView from './play-list-view'
import AlbumListView from './album-list-view'
import PlayerView from './player-view'
import EjectIcon from 'react-icons/lib/fa/eject'
import { inject, observer } from 'mobx-react'
import { View, Button, Gutter, Divider } from 'ui'
import { Toolbar } from 'app/components'
import FilterGroup from './filter-group'
import OrderButtonGroup from './order-button-group'
import LightIcon from 'react-icons/lib/md/lightbulb-outline'

@inject('appState')
@observer
export default class PlayerScreen extends React.Component {
  render() {
    const { appState } = this.props

    return (
      <View flow="column" style={{ flex: 1 }}>
        <Toolbar>
          <View flow="row" style={{ flex: 1 }}>
            <FilterGroup />
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