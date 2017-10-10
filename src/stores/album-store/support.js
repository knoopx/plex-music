import firstBy from 'thenby' // TODO: replace with lodash/fp
import _ from 'lodash'

import { Album } from 'models'


export const OrderFn = {
  alphabetically: firstBy('artistName', { ignoreCase: true }).thenBy('year', { direction: -1 }).thenBy('title', { ignoreCase: true }),
  userRating: firstBy('userRating', { direction: -1 }).thenBy('artistName', { ignoreCase: true }).thenBy('year', { direction: -1 }).thenBy('title', { ignoreCase: true }),
  recentlyAdded: firstBy('addedAt', { direction: -1 }),
}

export function match(album, filter) {
  return _.every(filter, (value, key) => {
    if (_.isEmpty(value)) { return true }
    return _.some(album.matchData[key], targetValue => (new RegExp(value, 'i').test(targetValue)))
  })
}
