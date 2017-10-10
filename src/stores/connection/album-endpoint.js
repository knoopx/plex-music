import _ from 'lodash'
import { runInAction } from 'mobx'
import { Album, Section } from 'models'
import Endpoint from './endpoint'

export default class Albums extends Endpoint {
  async find(id) {
    const doc = this.connection.request(`/library/metadata/${id}`)
    if (!doc.MediaContainer || !Array.isArray(doc.MediaContainer.Directory)) { throw new Error('Unexpected response') }
    return Album.parse(doc.MediaContainer.Directory[0], this.connection)
  }

  async findAll(section, query = { excludeFields: ['summary', 'parentThumb', 'originallyAvailableAt'] }) {
    const doc = await this.connection.request(`/library/sections/${section.id}/all`, { type: 9, ...query })
    if (!doc.MediaContainer || !_.isArray(doc.MediaContainer.Metadata)) { throw new Error('Unexpected response') }
    return runInAction(() => _.map(doc.MediaContainer.Metadata, item => Album.parse(item, this.connection)))
  }
}
