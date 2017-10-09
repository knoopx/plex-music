// @flow

import { types } from 'mobx-state-tree'


import PlayListItem from './playlist-item'

export default types
  .model('PlaybackStore', {
    currentTime: types.optional(types.number, 0),
    duration: types.optional(types.number, 0),
    buffered: types.optional(types.number, 0),
    playlist: types.optional(types.array(PlayListItem), []),
    activeIndex: types.optional(types.number, -1),
    isFetching: types.optional(types.boolean, false),
    isLoading: types.optional(types.boolean, false),
    isPlaying: types.optional(types.boolean, false),
  })
  .views(self => ({
    get activeItem() {
      return self.playlist[self.activeIndex]
    },
  }))
  .actions((self) => {
    const audio = new Audio()

    return {
      onDataLoaded() {
        self.isLoading = false
        self.duration = audio.duration
        self.buffered = audio.buffered.end(audio.buffered.length - 1)
      },
      onTimeUpdate() {
        self.currentTime = audio.currentTime
      },
      onProgress() {
        if (audio.buffered.length > 0) {
          self.buffered = audio.buffered.end(audio.buffered.length - 1)
        }
      },
      onEnded() {
        self.playNext()
      },
      onError() {
      },
      onPlay() {
        self.isPlaying = true
      },
      onPause() {
        self.isPlaying = false
      },
      play() {
        audio.play()
      },
      pause() {
        audio.pause()
      },
      playItemAtIndex(index) {
        if (index >= 0 && index < self.playlist.length) {
          const item = self.playlist[index]
          if (item) {
            self.unload()
            self.activeIndex = index
            self.load(item.track.url)
            self.play()
          } else {
            self.pause()
          }
        }
      },
      playPrev() {
        self.playItemAtIndex(self.activeIndex - 1)
      },
      playNext() {
        self.playItemAtIndex(self.activeIndex + 1)
      },
      toggle() {
        if (self.isPlaying) {
          self.pause()
        } else {
          self.play()
        }
        return false
      },
      seekTo(value) {
        audio.currentTime = value
      },
      load(src) {
        self.isLoading = true
        audio.addEventListener('loadeddata', self.onDataLoaded)
        audio.addEventListener('timeupdate', self.onTimeUpdate)
        audio.addEventListener('progress', self.onProgress)
        audio.addEventListener('play', self.onPlay)
        audio.addEventListener('pause', self.onPause)
        audio.addEventListener('ended', self.onEnded)
        audio.addEventListener('error', self.onError)
        audio.src = src
      },
      unload() {
        audio.pause()
        audio.removeEventListener('loadeddata', self.onDataLoaded)
        audio.removeEventListener('timeupdate', self.onTimeUpdate)
        audio.removeEventListener('progress', self.onProgress)
        audio.removeEventListener('play', self.onPlay)
        audio.removeEventListener('pause', self.onPause)
        audio.removeEventListener('ended', self.onEnded)
        audio.removeEventListener('error', self.onError)
        self.activeIndex = -1
        self.currentTime = 0
        self.duration = 0
        self.buffered = 0
      },
      replace(playlist, shouldPlay = true) {
        self.playlist.replace(playlist)

        if (shouldPlay) {
          self.playItemAtIndex(0)
        }
      },
      append(playlist) {
        self.playlist.push(...playlist)
      },
      setIsFetching(value) {
        self.isFetching = value
      },
    }
  })
