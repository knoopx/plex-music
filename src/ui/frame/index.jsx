import React from 'react'
import { theme } from 'ui/theming'
import View from '../layout/view'

@theme('frame')
export default class Frame extends React.PureComponent {
  render() {
    return <View {...this.props} />
  }
}
