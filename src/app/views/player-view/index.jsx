// @flow

import React from 'react'
import mousetrap from 'mousetrap'
import PlayListView from './play-list-view'
import AlbumListView from './album-list-view'
import PlayerView from './player-view'

import LightIcon from 'react-icons/lib/md/lightbulb-outline'
import EjectIcon from 'react-icons/lib/fa/eject'


import { inject, observer } from 'mobx-react'

import { OrderFn } from 'store/album-store'
import { Toolbar } from 'app/components'
import { View, Button, Gutter, Divider, Select } from 'ui'

import FilterGroup from './filter-group'
import OrderButtonGroup from './order-button-group'

@inject('store')
@observer
export default class PlayerScreen extends React.Component {
  componentWillMount() {
    const { albumStore, playbackStore } = this.props.store
    mousetrap.bind('command+r', this.refresh)
    mousetrap.bind('space', playbackStore.toggle)
    mousetrap.bind('shift+left', playbackStore.playPrev)
    mousetrap.bind('shift+right', playbackStore.playNext)

    Object.keys(OrderFn).forEach((order, i) => {
      mousetrap.bind(`command+${i + 1}`, () => albumStore.setOrder(order))
    })
  }

  componentWillUnmount() {
    const { playbackStore } = this.props.store
    mousetrap.unbind('command+r', this.refresh)
    mousetrap.bind('space', playbackStore.toggle)
    mousetrap.bind('shift+left', playbackStore.playPrev)
    mousetrap.bind('shift+right', playbackStore.playNext)
  }

  refresh(e) {
    this.props.store.fetchAlbums(this.props.store.activeDevice.activeSection)
    e.preventDefault()
  }

  render() {
    const { store } = this.props

    return (
      <View flow="column" style={{ flex: 1 }}>
        <Toolbar>
          <View flow="row" style={{ flex: 1 }}>
            <Gutter size={70} />
            <FilterGroup />
            <Gutter size={4} />
            <Select value={store.activeDevice.activeSectionIndex} onChange={e => store.activeDevice.setActiveSection(store.activeDevice.artistSections[e.target.value])}>
              {store.activeDevice.artistSections.map((section, index) => (
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
            <Button active={store.themeName === 'dark'} style={{ width: 48, height: 34 }} onClick={() => store.setThemeName(store.themeName === 'dark' ? 'light' : 'dark')}><LightIcon size={18} /></Button>
            <Gutter size={4} />
            <Button style={{ width: 48, height: 34 }} onClick={() => store.setActiveDevice(null)}><EjectIcon size={18} /></Button>
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
