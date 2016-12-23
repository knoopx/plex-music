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

import { SwatchesPicker } from 'react-color'

class ColorPicker extends React.Component {
  state = {
    displayColorPicker: false,
  };

  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker })
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false })
  };

  render() {
    const popover = {
      position: 'absolute',
      top: 50,
      right: '0',
      zIndex: '2',
    }
    const cover = {
      position: 'fixed',
      top: '0px',
      right: '0px',
      bottom: '0px',
      left: '0px',
    }
    return (
      <div style={{ position: 'relative' }}>
        <Button onClick={this.handleClick} style={{ width: 48, height: 34 }} />
        {this.state.displayColorPicker && (
          <div style={popover}>
            <div style={cover} onClick={this.handleClose} />
            <SwatchesPicker color={this.props.color} triangle="top-right" onChange={color => this.props.onChange(color.hex)} />
          </div>
        )}
      </div>
    )
  }
}


@inject('appState')
@observer
export default class PlayerScreen extends React.Component {
  render() {
    const { appState } = this.props

    return (
      <View flow="column" style={{ flex: 1 }}>
        <Toolbar>
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
            <ColorPicker color={appState.accentColor} onChange={(value) => { appState.setAccentColor(value) }} />
            <ColorPicker color={appState.baseColor} onChange={(value) => { appState.setBaseColor(value) }} />
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
