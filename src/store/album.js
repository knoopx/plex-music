// @flow

import _ from 'lodash'
import { types, getParent } from 'mobx-state-tree'

import Track, { parse as parseTrack } from 'store/track'

export default types.model('Album', {
  id: types.identifier(types.string),
  title: types.string,
  artistName: types.string,
  year: types.maybe(types.number),
  userRating: types.optional(types.number, 0),
  addedAt: types.number,
  playCount: types.optional(types.number, 0),
  thumb: types.maybe(types.string),
  tag: types.array(types.string),
  genres: types.array(types.string),
  studio: types.maybe(types.string),

  tracks: types.optional(types.array(Track), []),
})
  .views(self => ({
    get section() {
      return getParent(self, 2)
    },
    get device() {
      return getParent(self.section, 2)
    },
    get account() {
      return getParent(self.device, 2)
    },
    get store() {
      return getParent(self.account)
    },
    get thumbUrl() {
      return self.thumb && `${self.device.localUri}${self.thumb}`
    },
    get artwork() {
      return self.thumbUrl && (`${self.device.uri}/photo/:/transcode?url=${encodeURIComponent(self.thumbUrl)}&width=64&height=64&X-Plex-Token=${encodeURIComponent(self.device.accessToken)}`)
    },
    get matchData() {
      return {
        query: [self.title, self.artistName],
        artist: [self.artistName],
        genre: self.genres,
        year: [self.year],
        studio: [self.studio],
      }
    },
  }))
  .actions(self => ({
    setTracks(tracks) {
      self.tracks = tracks
    },
    rate(userRating) {
      if (self.userRating === userRating) {
        self.device.rate(self.id, 0)
      } else {
        self.device.rate(self.id, userRating)
      }
    },
    async addToPlaybackStore(shouldAppend) {
      self.store.playbackStore.unload()
      self.store.playbackStore.setIsFetching(true)

      await self.fetchTracks()
      const items = _.map(self.tracks, t => ({ track: t, album: self }))
      if (shouldAppend) {
        self.store.playbackStore.append(items)
      } else {
        self.store.playbackStore.replace(items)
      }
      self.store.playbackStore.setIsFetching(false)
    },
    update(props) {
      Object.assign(self, props)
    },
    async fetchTracks() {
      const doc = await self.device.request(`/library/metadata/${self.id}/children`, { includeRelated: 0 })
      if (!doc.MediaContainer || !_.isArray(doc.MediaContainer.Metadata)) { throw new Error('Unexpected response') }
      return self.setTracks(_.orderBy(_.map(doc.MediaContainer.Metadata, item => parseTrack(item)), ['number', 'path']))
    },
  }))

export function parse(item) {
  return {
    id: item.ratingKey,
    title: item.title.trim(),
    artistName: item.parentTitle.trim(),
    year: item.year,
    userRating: item.userRating,
    addedAt: item.addedAt * 1000,
    playCount: item.viewCount,
    tag: [],
    thumb: item.thumb,
    studio: item.studio,
    genres: _.map(item.Genre, e => e.tag.trim()),
  }
}
