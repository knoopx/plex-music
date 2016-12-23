import React from 'react'
import ReactDOM from 'react-dom'
import DevTools from 'mobx-react-devtools'
import { useStrict } from 'mobx'
import { Provider } from 'mobx-react'
import { AppContainer } from 'react-hot-loader'

import { View } from 'ui'
import { AppState, Account, PlayQueue } from 'stores'

import './index.css'
import theme from './theme'

useStrict(process.env.NODE_ENV !== 'production')

const appState = new AppState()
const playQueue = new PlayQueue()
const account = new Account(appState)

function render() {
  const App = require('./app').default
  ReactDOM.render(
    <AppContainer>
      <Provider appState={appState} playQueue={playQueue} account={account} theme={theme}>
        <View flow="row" style={{ flex: 1 }}>
          <App />
          <DevTools position={{ top: 54, right: 10 }} />
        </View>
      </Provider>
    </AppContainer>
    , document.querySelector('#root'),
  )
}

if (module.hot) {
  module.hot.accept('./app', () => {
    render()
  })
}

render()
