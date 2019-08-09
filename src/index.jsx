import React from "react"
import ReactDOM from "react-dom"
import { configure } from "mobx"
import { Provider } from "mobx-react"
import { onSnapshot } from "mobx-state-tree"
import { debounce } from "lodash"

import Store from "./store"
import App from "./app"

const store = Store.create(
  localStorage.store ? JSON.parse(localStorage.store) : {},
)

function render() {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.querySelector("#root"),
  )
}

onSnapshot(
  store,
  debounce((snapshot) => {
    const { account } = snapshot
    localStorage.store = JSON.stringify({ account })
  }, 500),
)

render()
