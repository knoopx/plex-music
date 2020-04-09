import _ from 'lodash'
import Axios from 'axios'
import { action } from 'mobx'

import AlbumEndpoint from './album-endpoint'
import ArtistEndpoint from './artist-endpoint'
import TrackEndpoint from './track-endpoint'
import SectionEndpoint from './section-endpoint'

export default class Connection {
  constructor(device) {
    this.device = device
    this.albums = new AlbumEndpoint(this)
    this.artists = new ArtistEndpoint(this)
    this.tracks = new TrackEndpoint(this)
    this.sections = new SectionEndpoint(this)
  }

  async getArtistSections() {
    const sections = await this.sections.findAll()
    const artistSections = _.filter(sections, { type: 'artist' })
    if (artistSections.length === 0) {
      throw new Error('No artist section found')
    }
    return artistSections
  }

  @action
  rate(id, rating) {
    return this.request('/:/rate', {
      key: id,
      rating,
      identifier: 'com.plexapp.plugins.library',
    })
  }

  get uri() {
    const connection = _.find(this.device.connections, {
      local: this.device.publicAddressMatches,
    })
    if (connection) {
      return connection.uri
    }
    throw new Error('Unable to find a suitable connection')
  }

  get localUri() {
    const { uri } = _.find(this.device.connections, { local: true })
    if (uri) {
      return uri
    }
    throw new Error('Unable to find a suitable connection')
  }

  async request(path, query = {}) {
    const res = await Axios.get(`${this.uri}${path}`, {
      params: query,
      headers: {
        Accept: 'application/json',
        'X-Plex-Token': this.device.accessToken,
      },
    })

    return res.data
  }
}
