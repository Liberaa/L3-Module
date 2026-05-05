import { Coin as GameCoin, Obstacle } from '../../node_modules/learn2dgame-js/dist/learn2dgame-js.js'
import { Coin, DeadlyElement, VanishingPlatform } from './Element.js'

export class LevelBuilder {
  #game
  #level

  constructor(game, level) {
    this.#game = game
    this.#level = level
  }

  build() {
    for (const element of this.#level.elements) {
      this.#createElement(element)
    }
  }

  #createElement(element) {
    if (element instanceof Coin) {
      new GameCoin({
        id: element.id,
        positionX: element.x,
        positionY: element.y
      })
      return
    }

    new Obstacle({
      id: element.id,
      positionX: element.x,
      positionY: element.y,
      width: element.width,
      height: element.height,
      color: element.color,
      deadly: element instanceof DeadlyElement,
      disappearOnLand: element instanceof VanishingPlatform,
      velocityX: element.velocityX ?? 0,
      velocityY: element.velocityY ?? 0
    })
  }
}
