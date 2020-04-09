import { observable, computed, action, IObservableArray } from 'mobx'

import mousetrap from 'mousetrap'

export default class PlayQueue {
  audio = new Audio()
  @observable currentTime = 0
  @observable duration = 0
  @observable buffered = 0
  @observable activeIndex = -1
  @observable playlist = observable.array()
  @observable isFetching = false
  @observable isLoading = false
  @observable isPlaying = false

  @computed
  get activeItem() {
    if (this.activeIndex >= 0 && this.activeIndex < this.playlist.length) {
      return this.playlist[this.activeIndex]
    }
    return null
  }

  constructor() {
    mousetrap.bind('space', this.toggle)
    mousetrap.bind('shift+left', this.playPrev)
    mousetrap.bind('shift+right', this.playNext)
  }

  @action.bound
  onDataLoaded() {
    this.isLoading = false
    this.duration = this.audio.duration
    this.buffered = this.audio.buffered.end(this.audio.buffered.length - 1)
  }

  @action.bound
  onTimeUpdate() {
    this.currentTime = this.audio.currentTime
  }

  @action.bound
  onProgress() {
    if (this.audio.buffered.length > 0) {
      this.buffered = this.audio.buffered.end(this.audio.buffered.length - 1)
    }
  }

  @action.bound
  onEnded() {
    this.playNext()
  }

  @action.bound
  onError() {}

  @action.bound
  onPlay() {
    this.isPlaying = true
  }

  @action.bound
  onPause() {
    this.isPlaying = false
  }

  @action.bound
  play() {
    this.audio.play()
  }

  @action.bound
  pause() {
    this.audio.pause()
  }

  @action.bound
  playItemAtIndex(index) {
    if (index >= 0 && index < this.playlist.length) {
      const item = this.playlist[index]
      if (item) {
        this.unload()
        this.activeIndex = index
        this.load(item.track.url)
        this.play()
      } else {
        this.pause()
      }
    }
  }

  @action.bound
  playPrev() {
    this.playItemAtIndex(this.activeIndex - 1)
  }

  @action.bound
  playNext() {
    this.playItemAtIndex(this.activeIndex + 1)
  }

  @action.bound
  toggle() {
    if (this.isPlaying) {
      this.pause()
    } else {
      this.play()
    }
    return false
  }

  @action.bound
  seekTo(value) {
    this.audio.currentTime = value
  }

  @action.bound
  load(src) {
    this.isLoading = true
    this.audio.addEventListener('loadeddata', this.onDataLoaded)
    this.audio.addEventListener('timeupdate', this.onTimeUpdate)
    this.audio.addEventListener('progress', this.onProgress)
    this.audio.addEventListener('play', this.onPlay)
    this.audio.addEventListener('pause', this.onPause)
    this.audio.addEventListener('ended', this.onEnded)
    this.audio.addEventListener('error', this.onError)
    this.audio.src = src
  }

  @action.bound
  unload() {
    this.audio.pause()
    this.audio.removeEventListener('loadeddata', this.onDataLoaded)
    this.audio.removeEventListener('timeupdate', this.onTimeUpdate)
    this.audio.removeEventListener('progress', this.onProgress)
    this.audio.removeEventListener('play', this.onPlay)
    this.audio.removeEventListener('pause', this.onPause)
    this.audio.removeEventListener('ended', this.onEnded)
    this.audio.removeEventListener('error', this.onError)
    this.activeIndex = -1
    this.currentTime = 0
    this.duration = 0
    this.buffered = 0
  }

  @action.bound
  replace(playlist, shouldPlay = true) {
    this.playlist.replace(playlist)

    if (shouldPlay) {
      this.playItemAtIndex(0)
    }
  }

  @action.bound
  append(playlist) {
    this.playlist.push(...playlist)
  }

  @action.bound
  setIsFetching(value) {
    this.isFetching = value
  }
}
