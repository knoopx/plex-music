import { observable } from 'mobx'

export default class ConnectionParams {
  @observable prococol
  @observable address
  @observable port
  @observable uri
  @observable local

  constructor(props) {
    Object.assign(this, props)
  }

  static parse(connection) {
    return new this({
      protocol: connection.getAttribute('protocol'),
      address: connection.getAttribute('address'),
      port: Number(connection.getAttribute('port')),
      uri: connection.getAttribute('uri'),
      local: !!JSON.parse(connection.getAttribute('local')),
    })
  }
}
