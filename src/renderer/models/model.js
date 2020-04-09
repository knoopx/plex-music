import {action} from 'mobx'
import Connection from 'stores/connection'

export default class Model {
  constructor(connection, props) {
    this.connection = connection
    this.update(props)
  }
  
  @action 
  update(props){
    Object.assign(this, props)
  }
}
