import { action, observable } from 'mobx'
import ConnectionParams from './connection-params'

export default class Device {
  @observable name
  @observable product
  @observable productVersion
  @observable platform
  @observable platformVersion
  @observable clientIdentifier
  @observable clientIdentifier
  @observable connections
  @observable accessToken
  @observable lastSeenAt
  @observable provides
  @observable publicAddressMatches

  constructor(props) {
    this.update(props)
  }
  
  @action 
  update(props){
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
      connections: Array.from(item.getElementsByTagName('Connection')).map(c =>
        ConnectionParams.parse(c)),
    })
  }
}
