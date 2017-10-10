import { action } from 'mobx'
import Model from './model'

export default class Section extends Model {
  @action static parse(item, connection) {
    return new this(connection, ({
      id: item.key,
      type: item.type,
      name: item.title,
    }))
  }
}
