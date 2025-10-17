export class Music {
  #audio
  constructor({ src, loop, volume }) {
    this.#audio = new Audio(src)
    this.#audio.loop = loop
    this.#audio.volume = volume
  }
  play() {
    if (this.#audio.paused) {
      this.#audio.currentTime = 0
      this.#audio.play()
    }
  }
}
