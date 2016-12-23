// @flow

import firstBy from 'thenby' // TODO: replace with lodash/fp
import { toJS } from 'mobx'
import _ from 'lodash'

import { Album } from 'models'
import type { OrderFnSet } from './types'

export const OrderFn : OrderFnSet = {
  alphabetically: firstBy('artistName', { ignoreCase: true }).thenBy('year', { direction: -1 }).thenBy('title', { ignoreCase: true }),
  userRating: firstBy('userRating', { direction: -1 }).thenBy('artistName', { ignoreCase: true }).thenBy('year', { direction: -1 }).thenBy('title', { ignoreCase: true }),
  recentlyAdded: firstBy('addedAt', { direction: -1 }),
}

export function match(album: Album, filter: {}) {
  const target = toJS({
    query: [album.title, album.artistName],
    artist: [album.artistName],
    genre: album.genres,
    year: [album.year],
  })

  return _.every(filter, (value, key) => {
    if (_.isEmpty(value)) { return true }
    return _.some(target[key], targetValue => (new RegExp(value, 'i').test(targetValue)))
  })
}
