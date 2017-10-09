// @flow

import _ from 'lodash'

import { types, getParent, process as asyncAction } from 'mobx-state-tree'
import { parse as parseAlbum } from 'store/album'
import { parse as parseArtist } from 'store/artist'

import Album from 'store/album'

export function parse(item) {
  return {
    id: item.key,
    type: item.type,
    name: item.title,
  }
}

export default types
  .model('Section', {
    id: types.identifier(types.string),
    type: types.string,
    name: types.string,
    albumMap: types.optional(types.map(Album), {}),
  })
  .views(self => ({
    get device() {
      return getParent(self, 2)
    },
    get albums() {
      return self.albumMap.values()
    },
  }))
  .actions(self => ({
    setAlbums(albums) {
      console.time('setAlbums')
      albums.forEach(album => self.albumMap.put(album))
      console.timeEnd('setAlbums')
    },
    fetchAlbums: asyncAction(function* (query = { excludeFields: ['summary', 'parentThumb', 'originallyAvailableAt'] }) {
      console.time('fetchAlbums')
      const doc = yield self.device.request(`/library/sections/${self.id}/all`, { type: 9, ...query })
      if (!doc.MediaContainer || !_.isArray(doc.MediaContainer.Metadata)) { throw new Error('Unexpected response') }
      self.setAlbums(_.map(doc.MediaContainer.Metadata, item => parseAlbum(item)))
      console.timeEnd('fetchAlbums')
    }),
    async findAllArtists(query = {}) {
      const doc = await self.device.request(`/library/sections/${self.id}/all`, { type: 8, ...query })
      if (!doc._children || !_.isArray(doc._children)) { throw new Error('Unexpected response') }
      return _.map(doc._children, item => parseArtist(item))
    },
  }))
