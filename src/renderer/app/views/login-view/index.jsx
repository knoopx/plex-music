import React from "react"
import { inject, observer, useLocalStore } from "mobx-react"
import { Text, Button, Input } from "ui"

const LoginView = ({ store }) => {
  const state = useLocalStore(() => ({
    login: "",
    password: "",
    setLoginParam(key, value) {
      state[key] = value
    },
  }))

  const performLogin = (e) => {
    e.preventDefault()
    store.account.login(state)
  }

  return (
    <form
      onSubmit={performLogin}
      className="flex flex-auto flex-col, items-center justify-center"
      style={{ paddingTop: 37 }}
    >
      <div className="flex flex-col" style={{ width: 300 }}>
        <h1 className="mb-4 text-center text-xl font-medium">
          Login to plex.tv
        </h1>

        <Input
          className="flex-auto mb-2"
          value={state.login}
          placeholder="Username"
          onChange={(e) => {
            state.setLoginParam("login", e.target.value)
          }}
        />
        <Input
          className="flex-auto mb-4"
          value={state.password}
          type="password"
          placeholder="Password"
          onChange={(e) => {
            state.setLoginParam("password", e.target.value)
          }}
        />

        <Button className="flex-auto" onClick={performLogin}>
          Connect
        </Button>
      </div>
    </form>
  )
}

export default inject("store")(observer(LoginView))
