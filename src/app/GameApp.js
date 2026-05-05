import { Game, SceneManager, Menu, score } from '../../node_modules/learn2dgame-js/dist/learn2dgame-js.js'
import { LevelBuilder } from '../domain/buildLevel.js'
import { levels } from '../domain/levels.js'
import { TARGET_SCORE_PER_LEVEL, PLAYER_OPTIONS, AUDIO_CONFIG, HOTKEYS } from '../config/constants.js'
import { Music } from './Music.js'
import { Hotkeys } from '../ui/Hotkeys.js'

export class GameApp {
  #game = null
  #scenes = null
  #menu = new Menu()
  #music = new Music(AUDIO_CONFIG)
  #hotkeys = new Hotkeys()
  #running = false

  start() {
    if (this.#running) return
    this.#game = new Game('platform', PLAYER_OPTIONS)
    this.#scenes = new SceneManager()
    for (const level of levels) {
      this.#scenes.add(() => new LevelBuilder(this.#game, level).build(), TARGET_SCORE_PER_LEVEL)
    }
    this.#scenes.set(0)
    this.#wireHotkeys()
    this.#music.play()
    this.#running = true
  }

  openMenu() {
    this.#menu.create({
      title: 'Pause',
      buttons: [
        { text: 'Resume', onClick: () => this.#menu.close() },
        { text: 'Reset Score', onClick: () => score.reset() }
      ]
    })
  }

  stop() {
    if (!this.#running) return
    this.#hotkeys.detach()
    try { this.#menu.close() } catch {}
    try { this.#game?.player?.remove() } catch {}
    this.#game = null
    this.#scenes = null
    this.#running = false
  }

  get isRunning() { return this.#running }

  #wireHotkeys() {
    this.#hotkeys.bind(HOTKEYS.menu, () => this.openMenu())
    this.#hotkeys.bind(HOTKEYS.startMusic, () => this.#music.play(), { once: true })
    this.#hotkeys.attach()
  }
}
