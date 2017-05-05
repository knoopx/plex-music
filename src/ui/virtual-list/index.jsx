import PropTypes from 'prop-types'
import React from 'react'
import { observable, computed, action, runInAction } from 'mobx'
import { propTypes, observer } from 'mobx-react'

@observer
export default class VirtualList extends React.PureComponent {
  static propTypes = {
    items: propTypes.arrayOrObservableArray.isRequired,
    itemHeight: PropTypes.number.isRequired,
    renderItem: PropTypes.func.isRequired,
    bufferSize: PropTypes.number.isRequired,
  }

  static defaultProps = {
    bufferSize: 0,
  }

  @observable scrollTop = 0
  @observable clientHeight = 0

  componentDidMount() {
    this.setScrollTop(this.container.scrollTop)
    this.setClientHeight(this.container.clientHeight)
    window.addEventListener('resize', this.onResize)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize)
  }

  onResize = () => {
    if (this.container) {
      this.setClientHeight(this.container.clientHeight)
    }
  }

  onScroll = (e) => {
    this.setScrollTop(e.target.scrollTop)
  }

  @action setScrollTop(value) {
    this.scrollTop = value
  }

  @action setClientHeight(value) {
    this.clientHeight = value
  }

  setContainer = (container) => {
    if (container) {
      this.container = container
      runInAction(() => {
        this.setScrollTop(container.scrollTop)
        this.setClientHeight(container.clientHeight)
      })
    }
  }

  scrollToTop() {
    if (this.container) {
      this.container.scrollTop = 0
      this.setScrollTop(0)
    }
  }

  @computed get totalHeight() {
    return this.props.itemHeight * this.props.items.length
  }

  @computed get visibleItemsCount() {
    return Math.ceil(this.clientHeight / this.props.itemHeight) + 1
  }

  @computed get firstItemIndex() {
    return Math.floor(this.scrollTop / this.props.itemHeight)
  }

  @computed get firstVisibleItemIndex() {
    return Math.max(0, this.firstItemIndex - this.props.bufferSize)
  }

  @computed get lastVisibleItemIndex() {
    return Math.min(this.firstItemIndex + this.props.bufferSize + this.visibleItemsCount, this.props.items.length)
  }

  @computed get visibleItemsOffsetY() {
    return Math.min(this.firstVisibleItemIndex * this.props.itemHeight, this.totalHeight)
  }

  @computed get visibleItems() {
    return this.props.items.slice(this.firstVisibleItemIndex, this.lastVisibleItemIndex)
  }

  render() {
    return (
      <div style={{ display: 'flex', flex: 1, flexDirection: 'row', overflow: 'hidden', WebkitAppRegion: 'no-drag' }}>
        <div ref={this.setContainer} style={{ flex: 1, flexDirection: 'column', maxWidth: '100%', overflowY: 'auto' }} onScroll={this.onScroll}>
          <div style={{ display: 'flex', flexDirection: 'column', height: this.totalHeight - this.visibleItemsOffsetY, transform: `translateY(${this.visibleItemsOffsetY}px)`, overflow: 'hidden', contain: 'paint' }}>
            {this.visibleItems.map(this.props.renderItem)}
          </div>
        </div>
      </div>
    )
  }
}
