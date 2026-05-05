export class Level {
  #elements

  constructor(elements = []) {
    this.#elements = elements
  }

  get elements() { return this.#elements }
}
