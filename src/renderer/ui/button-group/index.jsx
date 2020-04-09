import React from 'react'

import styles from './button-group.css'

export default class ButtonGroup extends React.PureComponent {
  renderButton(child) {
    return React.cloneElement(child, { className: styles.button })
  }

  render() {
    return (
      <div className={styles.default} {...this.props}>
        {React.Children.map(this.props.children, this.renderButton)}
      </div>
    )
  }
}
