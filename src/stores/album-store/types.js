export type OrderType = 'alphabetically' | 'userRating' | 'recentlyAdded'

export type Predicate = "artist" | "year" | "genre"

export type PredicateSet = {
  [key: Predicate]: string
}

export type FilterSet = {
  query?: string,
  predicates?: PredicateSet
}
