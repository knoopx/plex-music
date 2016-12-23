// @flow

import React from 'react'
import PlayListView from './play-list-view'
import AlbumListView from './album-list-view'
import PlayerView from './player-view'
import EjectIcon from 'react-icons/lib/fa/eject'
import { inject, observer } from 'mobx-react'
import { View, Button } from 'ui'
import { Gutter, Divider } from 'ui/layout'

import styles from './styles.css'
import FilterGroup from './filter-group'
import OrderButtonGroup from './order-button-group'


@inject('appState')
@observer
export default class PlayerScreen extends React.Component {
  render() {
    const { appState } = this.props

    return (
      <View flow="column" style={{ flex: 1 }}>
        <View flow="row" className={styles.toolbar} style={{ padding: 10 }}>
          <View flow="row" style={{ flex: 1 }}>
            <Gutter size={70} />
            <FilterGroup />
            <Gutter />
            <OrderButtonGroup />
          </View>
          <Gutter size={16} />
          <View flow="row" style={{ flex: 1 }}>
            <PlayerView />
            <Gutter size={16} />
            <Button style={{ width: 48, height: 34 }}><EjectIcon size={18} onClick={() => appState.disconnect()} /></Button>
          </View>
        </View>
        <View flow="row" style={{ flex: 1, backgroundColor: 'white' }}>
          <AlbumListView />
          <Divider />
          <PlayListView />
        </View>
      </View>
    )
  }
}
