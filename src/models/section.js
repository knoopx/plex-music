// @flow

import { action } from 'mobx'
import Model from './model'

export default class Section extends Model {
  id: number
  type: string
  name: string

  @action static parse(item, connection) {
    return new this(connection, ({
      id: item.key,
      type: item.type,
      name: item.title,
    }))
  }
}
