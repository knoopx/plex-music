// @flow

import { autorun, when } from 'mobx'
import { types } from 'mobx-state-tree'

import * as themes from 'app/themes'

import Account from './account'
import AlbumStore from './album-store'
import Device from './device'
import PlaybackStore from './playback-store'

export default types
  .model('RootStore', {
    themeName: types.optional(types.string, Object.keys(themes)[0]),
    account: types.optional(Account, {}),
    activeDevice: types.maybe(types.reference(Device)),
    albumStore: types.optional(AlbumStore, {}),
    playbackStore: types.optional(PlaybackStore, {}),
  })
  .views(self => ({
    get theme() {
      return themes[self.themeName]
    },
  }))
  .actions((self) => {
    const disposables = []

    return {
      afterCreate() {
        disposables.push(when(
          () => self.account.isLoggedIn && !self.activeDevice,
          () => {
            if (self.account.devices.length === 1) {
              self.setActiveDevice(self.account.devices[0])
            }
          },
        ))

        disposables.push(autorun(() => {
          if (self.activeDevice) {
            self.activeDevice.fetchSections()
          }
        }))

        disposables.push(autorun(() => {
          if (self.activeDevice && self.activeDevice.artistSections.length > 0 && !self.activeDevice.activeSection) {
            self.activeDevice.setActiveSection(self.activeDevice.artistSections[0])
          }
        }))
        disposables.push(autorun(() => {
          if (self.activeDevice && self.activeDevice.activeSection) {
            self.fetchAlbums(self.activeDevice.activeSection)
          }
        }))
      },
      beforeDestroy() {
        disposables.forEach((dispose) => { dispose() })
      },
      async fetchAlbums(section) {
        self.albumStore.setIsLoading(self.albumStore.matches.length === 0)
        try {
          await section.fetchAlbums()
        } finally {
          self.albumStore.setIsLoading(false)
        }
      },
      setThemeName(value) {
        if (themes[self.themeName]) {
          self.themeName = value
        }
      },
      setActiveDevice(device) {
        self.activeDevice = device
      },
    }
  })
