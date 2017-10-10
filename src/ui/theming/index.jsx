import React from 'react'
import { observable, extendObservable, action } from 'mobx'
import { observer, inject, Provider } from 'mobx-react'
import { merge } from 'lodash'

@observer
export class ThemeProvider extends React.Component {
  @observable theme = {}

  constructor(props, context) {
    super(props, context)
    this.mergeTheme(props.theme)
  }

  componentWillReceiveProps({ theme }) {
    this.mergeTheme(theme)
  }

  render() {
    return <Provider theme={this.theme}>{this.props.children}</Provider>
  }

  @action mergeTheme(theme) {
    extendObservable(this.theme, theme)
  }
}

export function theme(key, contextTypes) {
  return Component => (
    @inject('theme')
    @observer
    class extends React.Component {
      static displayName = `@theme(${Component.name})`

      render() {
        const { theme, children, ...props } = this.props
        return <Component {...merge({}, theme[key], props)}>{children}</Component>
      }
    }
  )
}
