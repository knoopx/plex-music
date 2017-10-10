import _ from 'lodash'

export default class ConnectionParams {
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
