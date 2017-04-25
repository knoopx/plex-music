import React from 'react'
import ReactDOM from 'react-dom'
import { useStrict } from 'mobx'
import { Provider } from 'mobx-react'
import { AppContainer } from 'react-hot-loader'
import { AppState, Account, PlayQueue } from 'stores'

import App from './app'

useStrict(true)

const appState = new AppState()
const playQueue = new PlayQueue()
const account = new Account(appState)

function render() {
  ReactDOM.render(
    <AppContainer>
      <Provider appState={appState} playQueue={playQueue} account={account}>
        <App />
      </Provider>
    </AppContainer>
    , document.querySelector('#root'),
  )
}

if (module.hot) { module.hot.accept('./app', render) }

render()
