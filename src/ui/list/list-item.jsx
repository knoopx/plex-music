import React from 'react'
import { observer } from 'mobx-react'

import style from './list-item.css'

@observer
export default class ListItem extends React.Component {
  render() {
    return (
      <div className={style.default} {...this.props} />
    )
  }
}
