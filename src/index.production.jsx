import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'mobx-react'
import { AppState, Account, PlayQueue } from 'stores'

import './index.css'
import App from './app'

const appState = new AppState()
const playQueue = new PlayQueue()
const account = new Account(appState)

ReactDOM.render(
  <Provider appState={appState} playQueue={playQueue} account={account}>
    <App />
  </Provider>
  , document.querySelector('#root'),
)
