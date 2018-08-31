import React from 'react'
import mousetrap from 'mousetrap'

import { MdLightbulbOutline } from 'react-icons/md'
import { FaEject } from 'react-icons/fa'

import { inject, observer } from 'mobx-react'

import { OrderFn } from 'store/album-store'
import { Toolbar } from 'app/components'
import { Button, Select } from 'ui'
import PlayerView from './player-view'
import AlbumListView from './album-list-view'
import PlayListView from './play-list-view'

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
      <div className="flex flex-auto flex-col">
        <Toolbar style={{ paddingLeft: 80 }}>
          <div className="flex w-1/2">
            <FilterGroup className="mr-4" />
            <Select
              className="mr-4"
              value={store.activeDevice.activeSectionIndex}
              onChange={e =>
                store.activeDevice.setActiveSection(
                  store.activeDevice.artistSections[e.target.value],
                )
              }
            >
              {store.activeDevice.artistSections.map((section, index) => (
                <option key={section.id} value={index}>
                  {section.name}
                </option>
              ))}
            </Select>
            <OrderButtonGroup />
          </div>
          <div className="flex w-1/2">
            <PlayerView />
            <Button
              className="ml-4"
              style={{ width: 48, height: 34 }}
              onClick={() => store.setActiveDevice(null)}
            >
              <FaEject size={18} />
            </Button>
          </div>
        </Toolbar>
        <div className="flex flex-auto">
          <AlbumListView />
          <PlayListView />
        </div>
      </div>
    )
  }
}
