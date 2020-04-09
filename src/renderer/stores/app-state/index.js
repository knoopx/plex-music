import { observable, computed, action, autorun } from 'mobx'

import * as themes from 'app/themes'
import { getItem, setItem } from 'support/storage'
import { Section } from 'models'
import Connection from 'stores/connection'
import AlbumStore from 'stores/album-store'

import Device from '../account/device'

export default class AppState {
  @observable themeName = getItem('theme', Object.keys(themes)[0])
  @observable isConnected = false
  @observable isConnecting = false
  @observable sections = observable.array()
  @observable activeSectionIndex = 0

  albumStore = new AlbumStore(this)

  @computed
  get section() {
    return this.sections[this.activeSectionIndex]
  }

  constructor() {
    this.deserialize()

    autorun(() => {
      if (this.albumStore && this.section) {
        this.albumStore.fetch(true)
      }
    })

    autorun(this.serialize)
  }

  @action.bound
  setThemeName(value) {
    if (themes[this.themeName]) {
      this.themeName = value
      setItem('theme', value)
    }
  }

  @computed
  get theme() {
    return themes[this.themeName]
  }

  @action.bound
  onChangeSection(e) {
    this.activeSectionIndex = Number(e.target.value)
  }

  @action.bound
  async connect(device) {
    this.setIsConnecting(true)
    try {
      this.setConnection(new Connection(device))
      this.setSections(await this.connection.getArtistSections())
      this.setIsConnected(true)
    } catch (e) {
      this.setIsConnected(false)
      throw e
    } finally {
      this.setIsConnecting(false)
    }
  }

  get deviceKey() {
    if (this.connection && this.connection.device) {
      return ['device', this.connection.device.clientIdentifier].join(':')
    }
  }

  get sectionKey() {
    if (this.deviceKey && this.section) {
      return [this.deviceKey, 'section', this.section.id].join(':')
    }
  }

  get activeSectionIndexKey() {
    if (this.deviceKey) {
      return `${this.deviceKey}:activeSectionIndex`
    }
  }

  serialize = () => {
    if (this.activeSectionIndexKey) {
      setItem(this.activeSectionIndexKey, this.activeSectionIndex)
    }
  }

  @action.bound
  deserialize() {
    this.activeSectionIndex = getItem(this.activeSectionIndexKey, 0)
  }

  @action.bound
  setSections(sections) {
    this.sections = sections
  }

  @action.bound
  setConnection(connection) {
    this.connection = connection
  }

  @action.bound
  setIsConnecting(value) {
    this.isConnecting = value
  }
  @action.bound
  setIsConnected(value) {
    this.isConnected = value
  }

  @action.bound
  disconnect() {
    this.setIsConnected(false)
  }
}
