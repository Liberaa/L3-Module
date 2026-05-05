export class MenuController {
  #startButton
  #app

  constructor(startButton, app) {
    if (!startButton) {
      throw new Error('MenuController requires a start button')
    }
    if (!app) {
      throw new Error('MenuController requires a GameApp instance')
    }

    this.#startButton = startButton
    this.#app = app
  }

  init() {
    this.#startButton.addEventListener('click', () => this.#onStart())
  }

  #onStart() {
    if (this.#app.isRunning) return

    this.#app.start()
    this.#startButton.style.display = 'none'
  }
}
