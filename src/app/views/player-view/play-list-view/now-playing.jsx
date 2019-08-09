import React from 'react'
import { observer } from 'mobx-react'

import { Text } from 'ui'

import { Artwork } from 'app/components'

const NowPlaying = props => {
  const { activeItem, ...props } = props

  return (
    <div className="flex flex-none p-4 bg-grey-lighter" {...props}>
      <Artwork key={activeItem.album.id} size={48} src={activeItem.album.artwork} />
      <div className="ml-4 flex flex-col">
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
};

export default observer(NowPlaying);
