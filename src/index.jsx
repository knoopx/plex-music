import React from 'react'
import ReactDOM from 'react-dom'
import { useStrict } from 'mobx'
import { Provider } from 'mobx-react'
import { AppState, Account, PlayQueue } from 'stores'

import App from './app'

useStrict(true)

const appState = new AppState()
const playQueue = new PlayQueue()
const account = new Account(appState)

ReactDOM.render(
  <Provider appState={appState} playQueue={playQueue} account={account}>
    <App />
  </Provider>,
  document.querySelector('#root'),
)
