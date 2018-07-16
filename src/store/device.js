import _ from 'lodash'
import Axios from 'axios'
import { types } from 'mobx-state-tree'
import Connection, { parse as parseConnection } from './connection'
import Section, { parse as parseSection } from './section'

export default types
  .model('Device', {
    name: types.string,
    product: types.string,
    productVersion: types.string,
    platform: types.string,
    platformVersion: types.string,
    clientIdentifier: types.identifier,
    connections: types.array(Connection),
    accessToken: types.string,
    lastSeenAt: types.number,
    provides: types.string,
    publicAddressMatches: types.boolean,

    isConnecting: types.optional(types.boolean, false),
    sections: types.optional(types.array(Section), []),
    activeSection: types.maybeNull(types.reference(Section)),
  })
  .views(self => ({
    get uri() {
      const connection = _.find(self.connections, { local: self.publicAddressMatches })
      if (connection) {
        return connection.uri
      }
      throw new Error('Unable to find a suitable connection')
    },
    get localUri() {
      const { uri } = _.find(self.connections, { local: true })
      if (uri) {
        return uri
      }
      throw new Error('Unable to find a suitable connection')
    },
    get artistSections() {
      return _.filter(self.sections, { type: 'artist' })
    },
    get activeSectionIndex() {
      return self.artistSections.indexOf(self.activeSection)
    },
  }))

  .actions(self => ({
    setSections(sections) {
      self.sections = sections
    },
    setActiveSection(activeSection) {
      self.activeSection = activeSection
    },
    async request(path, query = {}) {
      const res = await Axios.get(`${self.uri}${path}`, {
        params: query,
        headers: {
          Accept: 'application/json',
          'X-Plex-Token': self.accessToken,
        },
      })
      return res.data
    },
    async fetchSections() {
      self.setSections(await self.findAllSections())
    },
    async findAllSections() {
      const doc = await self.request('/library/sections')
      if (!doc.MediaContainer || !_.isArray(doc.MediaContainer.Directory)) { throw new Error('Unexpected response') }
      return _.map(doc.MediaContainer.Directory, item => parseSection(item))
    },
    async rate(id, rating) {
      return self.request('/:/rate', {
        key: id,
        rating,
        identifier: 'com.plexapp.plugins.library',
      })
    },
    async findAlbum(id) {
      const doc = self.request(`/library/metadata/${id}`)
      if (!doc.MediaContainer || !Array.isArray(doc.MediaContainer.Directory)) { throw new Error('Unexpected response') }
      return parseAlbum(doc.MediaContainer.Directory[0], self)
    },
  }))

export function parse(item) {
  return {
    name: item.getAttribute('name'),
    product: item.getAttribute('product'),
    productVersion: item.getAttribute('productVersion'),
    platform: item.getAttribute('platform'),
    platformVersion: item.getAttribute('platformVersion'),
    clientIdentifier: item.getAttribute('clientIdentifier'),
    createdAt: Number(item.getAttribute('createdAt')) * 1000,
    lastSeenAt: Number(item.getAttribute('lastSeenAt')) * 1000,
    provides: item.getAttribute('provides'),
    owned: Number(item.getAttribute('owned')),
    accessToken: item.getAttribute('accessToken'),
    httpsRequired: Number(item.getAttribute('httpsRequired')),
    synced: Number(item.getAttribute('synced')),
    relay: Number(item.getAttribute('relay')),
    publicAddressMatches: !!Number(item.getAttribute('publicAddressMatches')),
    presence: Number(item.getAttribute('presence')),
    connections: Array.from(item.getElementsByTagName('Connection')).map(c => parseConnection(c)),
  }
}
