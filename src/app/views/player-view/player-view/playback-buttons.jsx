//      

import React from 'react'
import { inject, observer } from 'mobx-react'

import { Button, ButtonGroup } from 'ui'

import FastForwardIcon from 'react-icons/lib/fa/fast-forward'
import FastBackwardIcon from 'react-icons/lib/fa/fast-backward'
import PlayIcon from 'react-icons/lib/fa/play'
import PauseIcon from 'react-icons/lib/fa/pause'


@inject('store')
@observer
export default class PlaybackButtons extends React.Component {
  render() {
    const { store } = this.props

    return (
      <ButtonGroup>
        <Button style={{ width: 48, height: 34 }} onClick={() => store.playbackStore.playPrev()}>
          <FastBackwardIcon />
        </Button>
        <Button style={{ width: 48, height: 34 }} onClick={() => store.playbackStore.toggle()}>
          {store.playbackStore.isPlaying ? <PauseIcon /> : <PlayIcon />}
        </Button>
        <Button style={{ width: 48, height: 34 }} onClick={() => store.playbackStore.playNext()}>
          {' '}
          <FastForwardIcon />
          {' '}
        </Button>
      </ButtonGroup>
    )
  }
}
