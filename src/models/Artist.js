// @flow

import { action } from 'mobx'
import Model from './model'
import Connection from 'stores/connection'

export default class Artist extends Model {
  id: number;
  name: string;
  addedAt: number;
  artwork: string;

  @action static parse(item, connection: Connection) {
    const { uri, device } = connection
    const { accessToken } = device
    const thumbUrl = item.thumb && (`${uri}${item.thumb}`)
    return new this(connection, {
      id: item.ratingKey,
      name: item.title.trim(),
      addedAt: item.addedAt * 1000,
      artwork: thumbUrl && (`${uri}/photo/:/transcode?url=${encodeURIComponent(thumbUrl)}&width=250&height=250&minSize=1&X-Plex-Token=${encodeURIComponent(accessToken)}`),
    })
  }
}
