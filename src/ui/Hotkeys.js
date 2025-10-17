export class Hotkeys {
  #handlers = new Map()
  bind(key, handler, options) {
    const lower = key.toLowerCase()
    this.#handlers.set(lower, { handler, once: !!options?.once })
  }
  attach() {
    document.addEventListener('keydown', this.#dispatch)
  }
  detach() {
    document.removeEventListener('keydown', this.#dispatch)
    this.#handlers.clear()
  }
  #dispatch = (e) => {
    const k = e.key.toLowerCase()
    const entry = this.#handlers.get(k)
    if (!entry) return
    entry.handler()
    if (entry.once) this.#handlers.delete(k)
  }
}
