// @flow

import _ from 'lodash'
import { Section } from 'models'
import Endpoint from './endpoint'

export default class Sections extends Endpoint {
  async findAll(): Promise<Array<Section>> {
    const doc = await this.connection.request('/library/sections')
    if (!doc.MediaContainer || !_.isArray(doc.MediaContainer.Directory)) { throw new Error('Unexpected response') }
    return _.map(doc.MediaContainer.Directory, item => Section.parse(item, this.connection))
  }
}
