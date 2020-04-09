import React from 'react'
import { inject, observer } from 'mobx-react'

import { Button, ButtonGroup } from 'ui'

import {MdPlayArrow, MdPause, MdSkipNext, MdSkipPrevious} from 'react-icons/md'

@inject('playQueue')
@observer
export default class PlaybackButtons extends React.Component {
  render() {
    const { playQueue } = this.props

    return (
      <ButtonGroup>
        <Button
          style={{ width: 48, height: 34, justifyContent: "center", alignItems: "center", display: "flex" }}
          onClick={playQueue.playPrev}
        >
          <MdSkipPrevious size={24} />
        </Button>
        <Button
          style={{ width: 48, height: 34, justifyContent: "center", alignItems: "center", display: "flex" }}
          onClick={playQueue.toggle}
        >
          {playQueue.isPlaying ? <MdPause size={24} /> : <MdPlayArrow size={24} />}
        </Button>
        <Button
          style={{ width: 48, height: 34, justifyContent: "center", alignItems: "center", display: "flex" }}
          onClick={playQueue.playNext}
        >
          <MdSkipNext size={24} />
        </Button>
      </ButtonGroup>
    )
  }
}
