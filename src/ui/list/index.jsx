import React from 'react'
import { observer, PropTypes } from 'mobx-react'
import { autobind } from 'core-decorators'

@autobind
@observer
export default class List extends React.Component {
  static propTypes = {
    items: PropTypes.arrayOrObservableArray.isRequired,
    selected: React.PropTypes.object,
    renderItem: React.PropTypes.func.isRequired,
    onSelect: React.PropTypes.func,
  }

  static defaultProps = {
    onSelect: () => {},
  }

  renderItem(item, index) {
    const isActive = this.props.items.includes(item) && this.props.selected === item
    return <div key={index} onClick={() => this.props.onSelect(item)}>{this.props.renderItem(item, index, isActive)}</div>
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
