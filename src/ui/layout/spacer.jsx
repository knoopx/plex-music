import React from 'react'

export default class Spacer extends React.PureComponent {
  render() {
    return (
      <div style={{ flex: 1, ...this.props.style }} />
    )
  }
}
