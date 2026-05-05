# Clean Code Reflection – L3 Module

**Student:** Lukas Söderlund (ls224ec)  
**Course:** 1DV610 – L3 Module  
**Date:** 2025-05-05  
**Repository:** https://github.com/Liberaa/L3-Module

---

## Introduction

This reflection covers chapters 2–11 of *Clean Code* and how each chapter has influenced the code in my L3 module. The L3 module is a browser-based 2D platformer game built on top of a third-party npm package (`learn2dgame-js`). The application is structured into layers: `app/` for the game orchestration, `domain/` for the game world model, `ui/` for user interface logic, and `config/` for constants. Where the chapter had no effect on the code, I say so honestly.

---

## Chapter 2: Meaningful Names

The chapter introduces the idea that a name should reveal its *intent* — a reader should not need to search for context to understand what a variable, function, or class does. Before refactoring, the codebase used unexplained literals like `20`, `0.3`, and `'platform'` scattered across the code. These were replaced with named constants in `constants.js`, each communicating not just the value but the purpose:

```javascript
// constants.js
export const TARGET_SCORE_PER_LEVEL = 20

export const AUDIO_CONFIG = Object.freeze({
  src: './music/background.mp3',
  loop: true,
  volume: 0.3
})

export const HOTKEYS = Object.freeze({
  menu: 'm',
  startMusic: 'd',
  restart: 'r'
})
```

The chapter also says method names should be verbs and class names should be nouns. This guided naming throughout: `LevelBuilder` (noun, builds levels), `#restartFromBeginning()` (verb phrase, clear action), `#isPaused()` (predicate, reads like a question in an `if` statement). One interesting tension: the book recommends avoiding noise words, yet `DeadlyElement` uses "Element" as a suffix — this was kept intentionally because dropping it to just `Deadly` would lose the signal that it belongs to the `Element` class hierarchy.

---

## Chapter 3: Functions

The chapter's core rule is that functions should be small and do one thing at one level of abstraction. The `Music` class is the clearest example of this in the codebase — `play()` contains no logic of its own, only delegation:

```javascript
// Music.js
play() {
  if (this.#isPaused()) {
    this.#restartFromBeginning()
  }
}

#isPaused() {
  return this.#audio.paused
}

#restartFromBeginning() {
  this.#resetToStart()
  this.#audio.play().catch(() => {})
}

#resetToStart() {
  this.#audio.currentTime = 0
}
```

Each method does exactly one thing and names it. However, `start()` in `GameApp` is an honest counter-example — it creates the game, the scene manager, loads all levels, wires hotkeys, and starts music in one method. The book would flag this as doing too many things. The argument for keeping it together is that all these steps belong to the same abstraction level (bootstrapping the game), but a stricter reading of the chapter would extract each into its own method.

---

## Chapter 4: Comments

The chapter argues that the need for a comment is often a failure to express intent through code, and that the best comment is a well-named function. Most comments were removed during refactoring by extracting named private methods — for example, instead of writing `// check if audio is paused`, the method `#isPaused()` was created. One comment remains in `constants.js`:

```javascript
// Use solution domain names
export const ElementType = Object.freeze({ ... })
```

This is a *noise comment* — the constant name already communicates enough, and the comment adds nothing. The chapter would call this out directly. On the other hand, the empty `.catch(() => {})` in `Music` is a case where a comment *is* justified but missing — a future reader might assume the catch is a mistake rather than a deliberate response to the browser's autoplay policy. This is the kind of *explanation of intent* the chapter considers a good comment.

---

## Chapter 5: Formatting

The chapter describes formatting as a form of communication — it shows which code belongs together and which does not. Within each file, private fields are declared first, followed by the constructor (if any), then public methods, then private helpers. This follows the *newspaper metaphor*: the most important interface is at the top, implementation details sink to the bottom.

```javascript
// GameApp.js – fields, then public, then private
export class GameApp {
  #game = null
  #scenes = null
  #menu = new Menu()
  #music = new Music(AUDIO_CONFIG)
  #hotkeys = new Hotkeys()
  #running = false

  start() { ... }      // public
  openMenu() { ... }   // public
  stop() { ... }       // public
  get isRunning() { }  // public

  #wireHotkeys() { }   // private, at the bottom
}
```

Indentation is consistently 2 spaces across all files. One area where the chapter's rules were not fully applied: `start()` is long enough that a blank line separating the setup phase from the startup phase would improve readability, but this was not added.

---

## Chapter 6: Objects and Data Structures

The chapter draws a sharp distinction between *objects* (hide data, expose behavior) and *data structures* (expose data, have no behavior). The old `levels.js` returned plain JavaScript objects like `{ type: 'coin', x: 350, y: 550 }` — that is a data structure, not an object. The refactored version uses proper domain classes:

```javascript
// Element.js – data is hidden, only getters are exposed
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

export class MovingPlatform extends Platform {
  #velocityX
  #velocityY

  get velocityX() { return this.#velocityX }
  get velocityY() { return this.#velocityY }
}
```

This matters because `LevelBuilder` can now use `instanceof` checks instead of reading a raw `type` string — it talks to objects through behavior, not through inspecting their data fields. The chapter's warning about *hybrids* (half object, half data structure) was avoided by committing fully to the class-based approach.

---

## Chapter 7: Error Handling

The chapter states that error handling should not obscure the main logic, and that returning `null` forces callers to check for it everywhere. `getStartButton()` in `index.js` follows this by throwing a descriptive error rather than returning `null`:

```javascript
// index.js
function getStartButton() {
  const button = document.getElementById(START_BUTTON_ID)
  if (!button) {
    throw new Error(`Start button with id '${START_BUTTON_ID}' not found in DOM`)
  }
  return button
}
```

The `stop()` method uses silent `try/catch` blocks for cleanup:

```javascript
// GameApp.js
stop() {
  this.#hotkeys.detach()
  try { this.#menu.close() } catch {}
  try { this.#game?.player?.remove() } catch {}
}
```

The chapter generally discourages swallowing errors silently. The argument here is that calling `close()` on an already-closed menu is not a true error condition — it is defensive cleanup. This is an honest tension: strictly following the chapter would require checking state before calling, but that adds complexity the silent catch avoids.

---

## Chapter 8: Boundaries

The chapter recommends wrapping third-party code so that the rest of the application is shielded from it. The `Music` class wraps the browser's `Audio` API — nothing outside `Music` knows about `currentTime`, `paused`, or `.play()`. If the Audio API changes, only `Music` needs updating. `LevelBuilder` serves a similar role for `learn2dgame-js`:

```javascript
// buildLevel.js – only this file knows about the library's Coin and Obstacle
import { Coin as GameCoin, Obstacle } from '../../node_modules/learn2dgame-js/dist/learn2dgame-js.js'
import { Coin, DeadlyElement, VanishingPlatform } from './Element.js'

#createElement(element) {
  if (element instanceof Coin) {
    new GameCoin({ id: element.id, positionX: element.x, positionY: element.y })
    return
  }
  new Obstacle({ deadly: element instanceof DeadlyElement, ... })
}
```

The naming collision between the library's `Coin` and the domain class `Coin` is resolved by aliasing the import (`Coin as GameCoin`), keeping the boundary clean. One remaining violation is that `GameApp` imports directly from the library's `dist/` path — ideally a single adapter module would own that import.

---

## Chapter 9: Unit Tests

The chapter argues that clean tests are as important as clean production code, and that untested code rots. This module has no automated tests — `package.json` still contains `"test": "echo \"Error: no test specified\""`. This is an honest weakness. The positive side of the refactoring is that the domain classes are now *testable in isolation*: a `Level` and `Coin` can be constructed without a browser, and `LevelBuilder.build()` could be verified against expected DOM output using jsdom. The `Hotkeys` class is similarly testable — `bind()` and the internal dispatch behavior are pure enough for unit tests. The absence of tests means the only validation has been manual testing through Go Live, which cannot catch regressions.

---

## Chapter 10: Classes

The chapter's main principles are the *Single Responsibility Principle* (a class should have one reason to change) and keeping classes small. The professor's feedback directly asked for more classes, and this refactoring introduced `GameApp`, `Music`, `Hotkeys`, `MenuController`, `LevelBuilder`, `Level`, `Element`, `Coin`, `Platform`, `MovingPlatform`, `VanishingPlatform`, and `DeadlyElement` — each with a single clear responsibility:

```javascript
export class MenuController {  // only reason to change: start button behavior
  #startButton
  #app

  init() {
    this.#startButton.addEventListener('click', () => this.#onStart())
  }

  #onStart() {
    if (this.#app.isRunning) return
    this.#app.start()
    this.#startButton.style.display = 'none'
  }
}
```

One interesting question is whether `VanishingPlatform` and `Coin` justify being separate classes since they add no behavior — their bodies are empty. The book's perspective would be that they *do* have a reason to exist: they give `instanceof` a name, making `LevelBuilder` readable. An alternative would be an `isDeadly()` method on `Element`, which would be more polymorphic but would push game-engine concerns into the domain model.

---

## Chapter 11: Systems

The chapter's key idea is to *separate construction from use* — the objects needed to run a system should be built in a dedicated startup phase, not mixed into business logic. In this application, `index.js` owns construction:

```javascript
// index.js – only constructs, does not run game logic
const app = new GameApp()

function initializeApplication() {
  const startButton = getStartButton()
  const menu = new MenuController(startButton, app)
  menu.init()
}
```

The actual game construction is deferred to `GameApp.start()`, which is only called when the user clicks the Start button — this separation means the page loads instantly and the game only initializes on demand. One violation is that `SceneManager` from the library is a singleton stored in `window.__sceneManager`, which means construction leaks into global state and cannot be controlled. If `stop()` followed by `start()` were called multiple times, stale state in the singleton could cause bugs. A factory or dependency injection pattern would be cleaner, but the library's design makes that impossible without wrapping it entirely.

---

## References

Martin, R. C. (2008). *Clean Code: A Handbook of Agile Software Craftsmanship*. Prentice Hall.
