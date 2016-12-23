import React from 'react'
import { inject } from 'mobx-react'

@inject('theme')
export default class Badge extends React.PureComponent {
  render() {
    const { theme } = this.props
    return (
      <div
        style={{ textAlign: 'center', minWidth: 32, backgroundColor: theme.primaryBackgroundColor, padding: '2px 8px', fontSize: 14, borderRadius: 999999, color: 'white' }}
        {...this.props}
      >
        {this.props.children}
      </div>
    )
  }
}
