// @flow

import React from 'react'
import { observable, action } from 'mobx'
import { inject, observer } from 'mobx-react'
import { autobind } from 'core-decorators'
import { Text, View, Button, Input, Gutter } from 'ui'

import type { LoginParams } from 'stores/account/types'

@inject('account')
@autobind
@observer
export default class LoginView extends React.Component {
  @observable loginParams: LoginParams = {
    login: '',
    password: '',
  }

  @action setLoginParam(key: mixed, value: mixed) {
    this.loginParams[key] = value
  }

  performLogin() {
    this.props.account.login(this.loginParams)
  }

  render() {
    return (
      <View flow="column" style={{ flex: 1, paddingTop: 37, alignItems: 'center', justifyContent: 'center' }}>
        <View flow="column" style={{ width: 300 }} >
          <Text bold size={24}>Login to plex.tv</Text>
          <Gutter />
          <Input
            style={{ flex: 1, fontSize: 18, height: 32 }}
            value={this.loginParams.login}
            placeholder={'Username'}
            onChange={(e) => { this.setLoginParam('login', e.target.value) }}
          />
          <Gutter size={8} />
          <Input
            style={{ flex: 1, fontSize: 18, height: 32 }}
            value={this.loginParams.password}
            type="password"
            placeholder={'Password'}
            onChange={(e) => { this.setLoginParam('password', e.target.value) }}
          />
          <Gutter />
          <Button style={{ flex: 1, height: 40 }} onClick={this.performLogin}>Connect</Button>
        </View>
      </View>
    )
  }
}
