import PropTypes from 'prop-types'
import React from 'react'
import { observer } from 'mobx-react'


@observer
export default class List extends React.Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
    selected: PropTypes.object,
    renderItem: PropTypes.func.isRequired,
    onSelect: PropTypes.func,
  }

  static defaultProps = { onSelect: () => {} }

  renderItem(item, index) {
    const isActive = this.props.items.includes(item) && this.props.selected === item
    return (
      <div key={index} onClick={() => this.props.onSelect(item)}>
        {this.props.renderItem(item, index, isActive)}
      </div>
    )
  }

  render() {
    const { selected, onSelect, items, renderItem, style, ...props } = this.props
    return (
      <div style={{ ...style, WebkitAppRegion: 'no-drag' }} {...props}>
        {items.map(this.renderItem)}
      </div>
    )
  }
}
