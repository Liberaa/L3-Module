export class Hotkeys {
  #handlers = new Map()

  bind(key, handler, options = {}) {
    const normalizedKey = this.#normalizeKey(key)
    const hotkeyConfig = this.#createHotkeyConfig(handler, options)
    this.#handlers.set(normalizedKey, hotkeyConfig)
  }

  attach() {
    document.addEventListener('keydown', this.#dispatch)
  }

  detach() {
    document.removeEventListener('keydown', this.#dispatch)
    this.#clearAllHandlers()
  }

  #normalizeKey(key) {
    return key.toLowerCase()
  }

  #createHotkeyConfig(handler, options) {
    return { 
      handler, 
      once: this.#shouldFireOnce(options) 
    }
  }

  #shouldFireOnce(options) {
    return !!options?.once
  }

  #clearAllHandlers() {
    this.#handlers.clear()
  }

  #dispatch = (event) => {
    const pressedKey = this.#normalizeKey(event.key)
    const hotkeyConfig = this.#findHandler(pressedKey)
    
    if (this.#noHandlerFound(hotkeyConfig)) return
    
    this.#executeHandler(pressedKey, hotkeyConfig)
  }

  #findHandler(key) {
    return this.#handlers.get(key)
  }

  #noHandlerFound(config) {
    return !config
  }

  #executeHandler(key, config) {
    config.handler()
    
    if (this.#shouldRemoveAfterExecution(config)) {
      this.#removeHandler(key)
    }
  }

  #shouldRemoveAfterExecution(config) {
    return config.once
  }

  #removeHandler(key) {
    this.#handlers.delete(key)
  }
}
