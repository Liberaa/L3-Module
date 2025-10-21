import { Game, SceneManager, Menu, score } from '../../node_modules/learn2dgame-js/dist/learn2dgame-js.js'
import { applyLevel } from '../domain/buildLevel.js'
import { levels } from '../domain/levels.js'
import { TARGET_SCORE_PER_LEVEL, PLAYER_OPTIONS, AUDIO_CONFIG } from '../config/constants.js'
import { Music } from './Music.js'
import { Hotkeys } from '../ui/Hotkeys.js'

export class GameApp {
  #game = null
  #scenes = null
  #menu = new Menu()
  #music = new Music(AUDIO_CONFIG)
  #hotkeys = new Hotkeys()
  #running = false
// test from pc
  start() {
    if (this.#running) return
    this.#running = true
    this.#wireHotkeys()
    this.#scenes = new SceneManager()
    this.#game = new Game('platform', PLAYER_OPTIONS)
    for (const level of levels) this.#scenes.add(() => applyLevel(this.#game, level), TARGET_SCORE_PER_LEVEL)
    this.#scenes.set(0)
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
    this.#hotkeys.bind(AUDIO_CONFIG.menuKey, () => this.openMenu())
    this.#hotkeys.bind(AUDIO_CONFIG.startKey, () => this.#music.play(), { once: true })
    this.#hotkeys.attach()
  }
}
