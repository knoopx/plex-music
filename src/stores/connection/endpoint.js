// @flow

import Connection from 'stores/connection'

export default class Endpoint {
  connection: Connection
  constructor(connection: Connection) {
    this.connection = connection
  }
}
