import { types } from 'mobx-state-tree'

export default types.model('LoginParams', {
  login: types.string,
  password: types.string,
})
