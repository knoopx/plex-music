import _ from 'lodash'
import { Artist } from 'models'
import Endpoint from './endpoint'

export default class Artists extends Endpoint {
  async findAll(section, query = {}) {
    const doc = await this.connection.request(
      `/library/sections/${section.id}/all`,
      { type: 8, ...query },
    )
    if (!doc._children || !_.isArray(doc._children)) {
      throw new Error('Unexpected response')
    }
    return _.map(doc._children, item => Artist.parse(item, this.connection))
  }
}
