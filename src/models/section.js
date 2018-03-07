import { observable } from 'mobx'
import Model from './model'

export default class Section extends Model {
  @observable type
  @observable name

  static parse(item, connection) {
    return new this(connection, {
      id: item.key,
      type: item.type,
      name: item.title,
    })
  }
}
