import React from "react"
import { observable, action } from "mobx"
import { inject, observer } from "mobx-react"

import { Text, Button, Input } from "ui"

const LoginView = (props) => {
  const loginParams = observable({
    login: "",
    password: "",
  })

  const setLoginParam = (key, value) => {
    loginParams[key] = value
  }

  const performLogin = (e) => {
    e.preventDefault()
    props.store.account.login(loginParams)
  }

  return (
    <form
      onSubmit={performLogin}
      className="flex flex-auto flex-col, items-center justify-center"
      style={{ paddingTop: 37 }}
    >
      <div className="flex flex-col" style={{ width: 300 }}>
        <Text bold size={24}>
          Login to plex.tv
        </Text>
        <Input
          className="flex-auto"
          value={loginParams.login}
          placeholder="Username"
          onChange={(e) => {
            setLoginParam("login", e.target.value)
          }}
        />
        <Input
          className="flex-auto"
          value={loginParams.password}
          type="password"
          placeholder="Password"
          onChange={(e) => {
            setLoginParam("password", e.target.value)
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
