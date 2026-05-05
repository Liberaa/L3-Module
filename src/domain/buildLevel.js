import { Obstacle, Coin } from '../../node_modules/learn2dgame-js/dist/learn2dgame-js.js'
import { ElementType } from '../config/constants.js'

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
    if (element.type === ElementType.COIN) {
      new Coin({
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
      deadly: element.type === ElementType.DEADLY,
      disappearOnLand: element.type === ElementType.VANISHING_PLATFORM,
      velocityX: element.velocityX ?? 0,
      velocityY: element.velocityY ?? 0
    })
  }
}
