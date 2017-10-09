import React from 'react'
import ReactDOM from 'react-dom'
import { useStrict } from 'mobx'
import { Provider } from 'mobx-react'
import { AppContainer } from 'react-hot-loader'
import { onSnapshot, getSnapshot, applySnapshot } from 'mobx-state-tree'
import { debounce } from 'lodash'

import Store from './store'
import App from './app'

useStrict(true)

console.time('store')
const store = Store.create((module.hot && module.hot.data && module.hot.data.store) || localStorage.store ? JSON.parse(localStorage.store) : {})
console.timeEnd('store')

function render() {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <App />
      </Provider>
    </AppContainer>
    , document.querySelector('#root'),
  )
}

onSnapshot(store, debounce((snapshot) => {
  const { account } = snapshot
  localStorage.store = JSON.stringify({ account })
}, 500))

render()

if (module.hot) {
  module.hot.accept('./app', render)
  //
  // if (module.hot.data && module.hot.data.store) {
  //   console.log('module.hot.data')
  //   applySnapshot(store, module.hot.data.store)
  // }
  // module.hot.dispose((data) => {
  //   console.debug('module.hot.dispose')
  //   data.store = getSnapshot(store)
  // })
}
