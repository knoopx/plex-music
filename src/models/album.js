import { map } from 'lodash'
import { observable, computed, action } from 'mobx'
import Model from './model'

export default class Album extends Model {
  @observable


  rate(rating) {
    return this.connection.rate(this.id, rating)
  }

  @computed get matchData() {
    return {
      query: [this.title, this.artistName],
      artist: [this.artistName],
      genre: this.genres,
      studio: [this.studio],
      year: [this.year],
    }
  }

  @action static parse(item, connection) {
    const { uri, localUri, device } = connection
    const thumbUrl = item.thumb && (`${localUri}${item.thumb}`)
    return new this(connection, {
      id: item.ratingKey,
      title: item.title.trim(),
      artistName: item.parentTitle.trim(),
      year: item.year,
      userRating: item.userRating,
      addedAt: item.addedAt * 1000,
      playCount: item.viewCount,
      tag: [],
      genres: map(item.Genre, e => e.tag.trim()),
      studio: item.studio,
      artwork: thumbUrl && (`${uri}/photo/:/transcode?url=${encodeURIComponent(thumbUrl)}&width=64&height=64&X-Plex-Token=${encodeURIComponent(device.accessToken)}`),
    })
  }

  @action update(props) {
    Object.assign(this, props)
  }
}
