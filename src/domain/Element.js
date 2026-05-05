export class Element {
  #id
  #x
  #y

  constructor({ id = null, x, y }) {
    this.#id = id
    this.#x = x
    this.#y = y
  }

  get id() { return this.#id }
  get x() { return this.#x }
  get y() { return this.#y }
}

export class Coin extends Element {}

export class Platform extends Element {
  #width
  #height
  #color

  constructor({ id, x, y, width, height, color = null }) {
    super({ id, x, y })
    this.#width = width
    this.#height = height
    this.#color = color
  }

  get width() { return this.#width }
  get height() { return this.#height }
  get color() { return this.#color }
}

export class MovingPlatform extends Platform {
  #velocityX
  #velocityY

  constructor({ id, x, y, width, height, color, velocityX = 0, velocityY = 0 }) {
    super({ id, x, y, width, height, color })
    this.#velocityX = velocityX
    this.#velocityY = velocityY
  }

  get velocityX() { return this.#velocityX }
  get velocityY() { return this.#velocityY }
}

export class VanishingPlatform extends Platform {}

export class DeadlyElement extends Platform {
  #velocityX
  #velocityY

  constructor({ id, x, y, width, height, velocityX = 0, velocityY = 0 }) {
    super({ id, x, y, width, height })
    this.#velocityX = velocityX
    this.#velocityY = velocityY
  }

  get velocityX() { return this.#velocityX }
  get velocityY() { return this.#velocityY }
}
