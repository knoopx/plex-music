export default class Model {
  constructor(connection, props) {
    this.connection = connection
    Object.assign(this, props)
  }
}
