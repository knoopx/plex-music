//

import React from 'react'
import { observable, action } from 'mobx'
import { inject, observer } from 'mobx-react'

import { Text, Button, Input } from 'ui'

@inject('store')
@observer
export default class LoginView extends React.Component {
  @observable loginParams = {
    login: '',
    password: '',
  }

  @action setLoginParam(key, value) {
    this.loginParams[key] = value
  }

  performLogin(e) {
    e.preventDefault()
    this.props.store.account.login(this.loginParams)
  }

  render() {
    return (
      <form
        onSubmit={this.performLogin}
        className="flex flex-auto flex-col, items-center justify-center"
        style={{ paddingTop: 37 }}
      >
        <div className="flex flex-col" style={{ width: 300 }}>
          <Text bold size={24}>
Login to plex.tv
          </Text>
          <Input
            className="flex-auto"
            value={this.loginParams.login}
            placeholder="Username"
            onChange={(e) => { this.setLoginParam('login', e.target.value) }}
          />
          <Input
            className="flex-auto"
            value={this.loginParams.password}
            type="password"
            placeholder="Password"
            onChange={(e) => { this.setLoginParam('password', e.target.value) }}
          />
          <Button className="flex-auto" onClick={this.performLogin}>
Connect
          </Button>
        </div>
      </form>
    )
  }
}
