//

import React from 'react'
import { inject, observer } from 'mobx-react'

import { Button, ButtonGroup } from 'ui'

import { FaFastForward, FaFastBackward, FaPlay, FaPause } from 'react-icons/fa'

@inject('store')
@observer
export default class PlaybackButtons extends React.Component {
  render() {
    const { store } = this.props

    return (
      <ButtonGroup>
        <Button
          style={{ width: 48, height: 34 }}
          onClick={() => store.playbackStore.playPrev()}
        >
          <FaFastBackward />
        </Button>
        <Button
          style={{ width: 48, height: 34 }}
          onClick={() => store.playbackStore.toggle()}
        >
          {store.playbackStore.isPlaying ? <FaPause /> : <FaPlay />}
        </Button>
        <Button
          style={{ width: 48, height: 34 }}
          onClick={() => store.playbackStore.playNext()}
        >
          {' '}
          <FaFastForward />{' '}
        </Button>
      </ButtonGroup>
    )
  }
}
