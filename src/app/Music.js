export class Music {
  #audio

  constructor({ src, loop, volume }) {
    this.#audio = this.#createAudioElement(src, loop, volume)
  }

  play() {
    if (this.#isPaused()) {
      this.#restartFromBeginning()
    }
  }

  pause() {
    if (!this.#isPaused()) {
      this.#audio.pause()
    }
  }

  stop() {
    this.pause()
    this.#resetToStart()
  }

  #createAudioElement(src, loop, volume) {
    const audio = new Audio(src)
    audio.loop = loop
    audio.volume = volume
    return audio
  }

  #isPaused() {
    return this.#audio.paused
  }

  #restartFromBeginning() {
    this.#resetToStart()
    this.#audio.play()
  }

  #resetToStart() {
    const BEGINNING = 0
    this.#audio.currentTime = BEGINNING
  }
}
