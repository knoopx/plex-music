import { types } from 'mobx-state-tree'

export default types.model('Connection', {
  protocol: types.string,
  address: types.string,
  port: types.number,
  uri: types.string,
  local: types.boolean,
})

export function parse(connection) {
  return {
    protocol: connection.getAttribute('protocol'),
    address: connection.getAttribute('address'),
    port: Number(connection.getAttribute('port')),
    uri: connection.getAttribute('uri'),
    local: !!JSON.parse(connection.getAttribute('local')),
  }
}
