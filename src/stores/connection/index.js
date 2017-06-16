// @flow

import _ from 'lodash'
import Axios from 'axios'
import { action } from 'mobx'

import Device from 'stores/account/device'
import { Section } from 'models'

import AlbumEndpoint from './album-endpoint'
import ArtistEndpoint from './artist-endpoint'
import TrackEndpoint from './track-endpoint'
import SectionEndpoint from './section-endpoint'

export default class Connection {
  device: Device
  albums: AlbumEndpoint
  artists: ArtistEndpoint
  tracks: TrackEndpoint
  sections: SectionEndpoint

  constructor(device: Device) {
    this.device = device
    this.albums = new AlbumEndpoint(this)
    this.artists = new ArtistEndpoint(this)
    this.tracks = new TrackEndpoint(this)
    this.sections = new SectionEndpoint(this)
  }

  async getArtistSections(): Promise<Array<Section>> {
    const sections = await this.sections.findAll()
    const artistSections = _.filter(sections, { type: 'artist' })
    if (artistSections.length === 0) {
      throw new Error('No artist section found')
    }
    return artistSections
  }

  @action rate(id: number, rating: number) {
    return this.request('/:/rate', {
      key: id,
      rating,
      identifier: 'com.plexapp.plugins.library',
    })
  }

  get uri(): string {
    const connection = _.find(this.device.connections, { local: this.device.publicAddressMatches })
    if (connection) {
      return connection.uri
    }
    throw new Error('Unable to find a suitable connection')
  }

  get localUri(): string {
    const { uri } = _.find(this.device.connections, { local: true })
    if (uri) {
      return uri
    }
    throw new Error('Unable to find a suitable connection')
  }

  async request(path: string, query: {} = {}): Promise<any> {
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
