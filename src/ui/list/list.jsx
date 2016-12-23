import React from 'react'
import { observer, PropTypes } from 'mobx-react'
import { autobind } from 'core-decorators'
import ListItem from './list-item'

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
    return <ListItem key={index} onClick={() => this.props.onSelect(item)}>{this.props.renderItem(item, index, isActive)}</ListItem>
  }

  render() {
    const { selected, onSelect, items, renderItem, ...props } = this.props
    return (
      <div {...props}>
        {items.map(this.renderItem)}
      </div>
    )
  }
}
