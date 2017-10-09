import React from 'react'
import { observable, extendObservable, runInAction } from 'mobx'
import { observer, inject, Provider } from 'mobx-react'
import { merge } from 'lodash'

@observer
export class ThemeProvider extends React.Component {
  @observable theme = {}

  constructor(props, context) {
    super(props, context)
    extendObservable(this.theme, props.theme)
  }

  componentWillReceiveProps({ theme }) {
    runInAction(() => {
      extendObservable(this.theme, theme)
    })
  }

  render() {
    return <Provider theme={this.theme}>{this.props.children}</Provider>
  }
}

export function theme(key, contextTypes) {
  return Component => (
    @inject('theme')
    @observer
    class extends React.Component {
      static displayName = `@theme(${Component.name})`

      render() {
        const { children, theme, ...props } = this.props
        const mergedProps = merge({}, theme[key], props)
        return <Component {...{ children, ...mergedProps }} />
      }
    }
  )
}
