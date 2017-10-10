import React from 'react'
import { TransitionMotion, spring } from 'react-motion'

export default class Transition extends React.PureComponent {
  getStyles() {
    return React.Children.map(this.props.children, child => ({
      key: this.props.name,
      style: { opacity: spring(1) },
      data: child,
    }))
  }

  willEnter() {
    return {
      opacity: 0,
    }
  }

  willLeave() {
    return {
      opacity: spring(0),
    }
  }

  render() {
    return (
      <TransitionMotion
        styles={this.getStyles()}
        willEnter={this.willEnter}
        willLeave={this.willLeave}
      >
        {interpolated => (
          <div style={{ position: 'relative', flex: 1 }}>
            {
              interpolated.map(({ key, style, data }) =>
                <div key={key} style={{ position: 'absolute', left: 0, top: 0, bottom: 0, right: 0, display: 'flex', ...style }}>{data}</div>)
            }
          </div>
        )}
      </TransitionMotion>
    )
  }
}
