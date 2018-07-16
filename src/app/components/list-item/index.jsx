import React from 'react'
import { TouchableOpacity } from 'ui'

export default class ListItem extends React.PureComponent {
  render() {
    const { active, className, ...props } = this.props

    return (
      <TouchableOpacity className={className}>
        <div
          className={['flex items-center px-4 py-2 border-b', { 'bg-active': active }, className]}
          {...props}
        />
      </TouchableOpacity>
    )
  }
}
