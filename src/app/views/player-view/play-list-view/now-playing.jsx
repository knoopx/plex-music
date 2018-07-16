//

import React from 'react'
import { observer } from 'mobx-react'

import { Text } from 'ui'

import { Artwork } from 'app/components'

@observer
export default class NowPlaying extends React.Component {
  render() {
    const { activeItem, ...props } = this.props

    return (
      <div className="flex flex-none p-4 bg-grey-lighter" {...props}>
        <Artwork key={activeItem.album.id} size={48} src={activeItem.album.artwork} />
        <div className="flex flex-col">
          <Text bold>
            {activeItem.track.title}
          </Text>
          <Text>
            {activeItem.album.title}
          </Text>
          <Text muted>
            {activeItem.track.artistName}
          </Text>
        </div>
      </div>
    )
  }
}
