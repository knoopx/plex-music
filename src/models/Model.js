// @flow

import Connection from 'stores/connection'

export default class Model {
  connection: Connection

  constructor(connection: Object, props: {}) {
    this.connection = connection
    Object.assign(this, props)
  }
}
