import React from 'react'
import Spinner from '../spinner'

export default class LoadingSlate extends React.Component {
  render() {
    const { style } = this.props
    return (
      <div style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center', ...style }}>
        <Spinner size={64} />
      </div>
    )
  }
}
