import _ from 'lodash'
import firstBy from 'thenby' // TODO: replace with lodash/fp
import { types, getParent } from 'mobx-state-tree'

import { autorun } from 'mobx'

import Album from 'store/album'

// export const OrderType = types.enumeration('OrderType', [
//   'alphabetically',
//   'userRating',
//   'recentlyAdded',
// ])

export const Predicate = types.enumeration(['artist', 'year', 'genre'])

export const OrderFn = {
  alphabetically: firstBy('artistName', { ignoreCase: true })
    .thenBy('year', { direction: -1 })
    .thenBy('title', { ignoreCase: true }),
  userRating: firstBy('userRating', { direction: -1 })
    .thenBy('artistName', { ignoreCase: true })
    .thenBy('year', { direction: -1 })
    .thenBy('title', { ignoreCase: true }),
  recentlyAdded: firstBy('addedAt', { direction: -1 }),
}

export function match(album, filter) {
  return _.every(filter, (value, key) => {
    if (_.isEmpty(value)) {
      return true
    }
    return _.some(album.matchData[key], targetValue => new RegExp(value, 'i').test(targetValue))
  })
}

export const PredicateSet = types.model('PredicateSet', {
  artist: types.maybeNull(types.string),
  year: types.maybeNull(types.string),
  genre: types.maybeNull(types.string),
  studio: types.maybeNull(types.string),
})

export const FilterSet = types.model('FilterSet', {
  query: types.optional(types.string, ''),
  predicates: PredicateSet,
})

export default types
  .model('AlbumStore', {
    isLoading: types.optional(types.boolean, false),
    isFiltering: types.optional(types.boolean, false),
    matches: types.optional(types.array(types.reference(Album)), []),
    query: types.optional(types.string, ''),
    order: types.optional(types.string, Object.keys(OrderFn)[0]),
  })
  .views(self => ({
    get filterSet() {
      const predicates = {}
      const query = _.reduce(
        [/(\w+):(\w+)/g, /(\w+):"([^"]+)"/g, /(\w+):'([^']+)'/g],
        (_query, regex) => _query.replace(regex, (__, key, value) => {
          predicates[key] = value
          return ''
        }),
        self.query,
      )

      return { query: query.trim(), ...predicates }
    },
  }))
  .actions((self) => {
    const disposables = []
    return {
      afterCreate() {
        disposables.push(
          autorun(
            () => {
              const { activeDevice } = getParent(self)
              if (
                activeDevice
                && activeDevice.activeSection
                && activeDevice.activeSection.albums.length > 0
              ) {
                console.time('filter')
                self.setIsFiltering(true)
                self.setMatches(
                  activeDevice.activeSection.albums.filter(album => match(album, self.filterSet)),
                )
                self.setIsFiltering(false)
                console.timeEnd('filter')
              }
            },
            { delay: 500 },
          ),
        )
      },
      beforeDestroy() {
        disposables.forEach((dispose) => {
          dispose()
        })
      },
      setMatches(matches) {
        console.time('setMatches')
        self.matches = matches
        console.timeEnd('setMatches')
      },
      setIsFiltering(value) {
        console.log('filter', value)
        self.isFiltering = value
      },
      setIsLoading(value) {
        self.isLoading = value
      },
      clearFilter() {
        self.setQuery('')
      },
      setQuery(text) {
        self.query = text
      },
      setOrder(value) {
        self.order = value
      },
    }
  })
