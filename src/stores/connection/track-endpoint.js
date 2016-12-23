// @flow

import _ from 'lodash'
import { Track } from 'models'
import { runInAction } from 'mobx'
import Endpoint from './endpoint'

export default class Tracks extends Endpoint {
  async findAllByAlbumId(albumId: number): Promise<Array<Track>> {
    const doc = await this.connection.request(`/library/metadata/${albumId}/children`, { includeRelated: 0 })
    if (!doc.MediaContainer || !_.isArray(doc.MediaContainer.Metadata)) { throw new Error('Unexpected response') }
    return runInAction(() => _.orderBy(_.map(doc.MediaContainer.Metadata, item => Track.parse(item, this.connection)), ['path', 'number']))
  }
}
