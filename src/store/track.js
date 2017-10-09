// @flow

import { types, getParent } from 'mobx-state-tree'

const Part = types.model('Part', {
  id: types.identifier(types.number),
  key: types.string,
  duration: types.number,
  file: types.string,
  size: types.number,
  container: types.string,
})

const Media = types.model('Media', {
  id: types.identifier(types.number),
  part: Part,
  audioChannels: types.number,
  audioCodec: types.string,
  bitrate: types.number,
  container: types.string,
  duration: types.number,
})

export default types
  .model('Track', {
    id: types.identifier(types.string),
    number: types.number,
    title: types.string,
    artistName: types.string,
    albumId: types.string,
    duration: types.number,
    media: Media,
  })
  .views(self => ({
    get album() {
      return getParent(self, 2)
    },
    get url() {
      return `${self.album.device.uri}${self.media.part.key}?X-Plex-Token=${encodeURIComponent(self.album.device.accessToken)}`
    },
    get path() {
      return self.part.file
    },
  }))

export function parse(item) {
  const { Part, ...media } = item.Media[0]
  return {
    id: item.ratingKey,
    number: item.index,
    title: item.title.trim(),
    artistName: item.grandparentTitle.trim(),
    albumId: item.grandparentRatingKey,
    duration: item.duration,
    media: { ...media, part: Part[0] },
  }
}
