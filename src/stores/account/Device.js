// @flow

import _ from 'lodash'
import ConnectionParams from './connection-params'

export default class Device {
  name: string
  product: string
  productVersion: string
  platform: string
  platformVersion: string
  clientIdentifier: string
  clientIdentifier: string
  connections: Array<ConnectionParams>
  accessToken: string
  lastSeenAt: number
  provides: string
  publicAddressMatches: boolean

  constructor(props: {}) {
    Object.assign(this, props)
  }

  static parse(item) {
    return new this({
      name: item.getAttribute('name'),
      product: item.getAttribute('product'),
      productVersion: item.getAttribute('productVersion'),
      platform: item.getAttribute('platform'),
      platformVersion: item.getAttribute('platformVersion'),
      clientIdentifier: item.getAttribute('clientIdentifier'),
      createdAt: Number(item.getAttribute('createdAt')) * 1000,
      lastSeenAt: Number(item.getAttribute('lastSeenAt')) * 1000,
      provides: item.getAttribute('provides'),
      owned: Number(item.getAttribute('owned')),
      accessToken: item.getAttribute('accessToken'),
      httpsRequired: Number(item.getAttribute('httpsRequired')),
      synced: Number(item.getAttribute('synced')),
      relay: Number(item.getAttribute('relay')),
      publicAddressMatches: !!Number(item.getAttribute('publicAddressMatches')),
      presence: Number(item.getAttribute('presence')),
      connections: _.map(Array.from(item.getElementsByTagName('Connection')), c => ConnectionParams.parse(c)),
    })
  }
}
