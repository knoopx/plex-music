import { types } from 'mobx-state-tree'

export default types
  .model('Artist', {
    id: types.identifier,
    name: types.string,
    addedAt: types.number,
    thumb: types.string,
  })
  .views(self => ({
    get thumbUrl() {
      return self.thumb && (`${self.device.uri}${self.thumb}`)
    },
    get artwork() {
      return self.thumbUrl && (`${self.device.uri}/photo/:/transcode?url=${encodeURIComponent(self.thumbUrl)}&width=250&height=250&minSize=1&X-Plex-Token=${encodeURIComponent(self.device.accessToken)}`)
    },
  }))

export function parse(item) {
  return {
    id: item.ratingKey,
    name: item.title.trim(),
    addedAt: item.addedAt * 1000,
    thumb: item.thumb,
  }
}
