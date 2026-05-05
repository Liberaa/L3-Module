# Clean Code Reflection – L3 Module

**Student:** Lukas Söderlund (ls224ec)  
**Course:** 1DV610 – L3 Module  
**Date:** 2026-05-05  
**Repository:** https://github.com/Liberaa/L3-Module

---

## Introduction

This reflection covers chapters 2–11 of *Clean Code* and how each chapter's specific rules have influenced the code in my L3 module. The project is a browser-based 2D platformer built on my own npm package (`learn2dgame-js`), structured into layers: `app/` (game orchestration), `domain/` (game world model), `ui/` (user interface), and `config/` (constants). For each chapter I apply the book's named concepts to concrete examples in the code, and I flag cases where rules conflict or were intentionally broken.

---

## Chapter 2: Meaningful Names

**Intention-revealing names** — The book says a name should tell you why something exists, what it does, and how it is used. Before refactoring, the codebase passed raw literals like `20`, `0.3`, and `'m'` directly to function calls. These were replaced with names that reveal purpose:

```javascript
// constants.js
export const TARGET_SCORE_PER_LEVEL = 20
export const HOTKEYS = Object.freeze({ menu: 'm', startMusic: 'd', restart: 'r' })
export const AUDIO_CONFIG = Object.freeze({ src: './music/background.mp3', loop: true, volume: 0.3 })
```

**Searchable names** — `'m'` as a raw string is not searchable; `HOTKEYS.menu` can be found with a single grep. This also prevents the bug where the same key string is duplicated in multiple places and one copy is updated while another is forgotten.

**Make meaningful distinctions** — The book warns against using noise words or number-series names (`Platform1`, `Platform2`). The domain model instead gives each type a name that explains what makes it distinct: `MovingPlatform`, `VanishingPlatform`, `DeadlyElement`. A reader immediately understands what separates them without reading the implementation.

**Class names are nouns, method names are verbs** — Every class in the project is named with a noun or noun phrase (`LevelBuilder`, `GameApp`, `MenuController`, `Hotkeys`) and every method with a verb or verb phrase (`build`, `attach`, `detach`, `#restartFromBeginning`, `#normalizeKey`). The book's rule that predicates should read like questions is followed: `#isPaused()` and `#noHandlerFound()` both read naturally inside an `if` statement.

**One word per concept** — The book warns against using `fetch`, `retrieve`, and `get` interchangeably. Across the codebase, creating something always uses `create` (`#createAudioElement`, `#createHotkeyConfig`) and normalising always uses `normalize` (`#normalizeKey`). The only exception is `build` in `LevelBuilder`, which is intentional — it is a *builder*, not a factory, and the distinction is meaningful.

**Tension — noise words** — `DeadlyElement` uses "Element" as a suffix, which the book would call a noise word since every class in the hierarchy is implicitly an element. It was kept because dropping it to `Deadly` loses the signal that this class belongs to the `Element` inheritance tree, which matters when reading `buildLevel.js`.

---

## Chapter 3: Functions

**Small and do one thing** — The `Music` class demonstrates the chapter's step-down rule: each method does exactly one named thing and delegates the rest downward.

```javascript
// Music.js
play() {
  if (this.#isPaused()) { this.#restartFromBeginning() }
}
#isPaused()           { return this.#audio.paused }
#restartFromBeginning() { this.#resetToStart(); this.#audio.play().catch(() => {}) }
#resetToStart()       { this.#audio.currentTime = BEGINNING }
```

A reader can understand `play()` in one glance without descending into implementation details. **One level of abstraction per function** is maintained: `play()` operates at the level of "what should happen", while `#resetToStart()` operates at the level of "how to touch the audio element".

**Don't repeat yourself** — `#normalizeKey(key)` in `Hotkeys` is called in both `bind()` and `#dispatch`, ensuring that the normalisation rule (`key.toLowerCase()`) lives in exactly one place. If the rule changes (for example, to handle `Escape` → `escape`), only one function needs updating.

**Command-query separation** — The book says a function should either do something (command) or answer something (query), not both. `start()` is a pure command (returns nothing, changes state), and `isRunning` is a pure query (returns state, changes nothing). `stop()` is also a command: it does not return a status code to indicate success, it simply acts.

**Niladic and monadic functions preferred** — Most functions in the project are niladic (no arguments): `play()`, `pause()`, `stop()`, `attach()`, `detach()`, `build()`. Where arguments are required, they are monadic: `bind(key, handler, options)` takes three, which is borderline. The book would suggest a config object here — and indeed `options` already is one.

**Tension — `start()` does too many things** — `GameApp.start()` creates the `Game`, the `SceneManager`, registers all levels, calls `set(0)`, wires hotkeys, and starts music. The book would argue this violates "do one thing." The counter-argument is that all these steps belong to a single abstraction level (bootstrapping), but a stricter reading would extract `#initializeGame()`, `#registerLevels()`, and `#startFirstLevel()` as separate private methods.

---

## Chapter 4: Comments

**Explain yourself in code** — The chapter's central point is that a comment is usually a failure to name something well. The `Hotkeys` class makes this explicit: instead of a comment like `// remove handler after it fires once`, there is a private method `#shouldRemoveAfterExecution(config)`. Instead of `// normalize key to lowercase`, there is `#normalizeKey(key)`. The code reads as its own explanation.

**Noise comments** — Two comments in `constants.js` are noise:

```javascript
// Use solution domain names
export const ElementType = Object.freeze({ ... })

//  Extract numbers
export const GAME_DIMENSIONS = Object.freeze({ ... })
```

Neither comment adds information that the constant name does not already provide. The book calls these *redundant comments* — they take time to read and add no value. They should be deleted.

**Good comment — explanation of intent** — The book says an explanation of *why* a decision was made is a legitimate comment. The empty `.catch(() => {})` in `Music.#restartFromBeginning()` is a case where a comment is missing but justified:

```javascript
// Browser autoplay policy rejects play() calls without prior user interaction.
// The rejection is expected and cannot be handled — suppress it silently.
this.#audio.play().catch(() => {})
```

Without this comment, a future developer might assume the empty catch is a bug or an oversight.

**Warning of consequences** — The book mentions that warning comments are valid when something dangerous is easy to get wrong. The `SceneManager` from `learn2dgame-js` is a singleton stored in `window.__sceneManager`. Calling `new SceneManager()` twice does not create a new instance — it returns the existing one. A comment on the `GameApp` field declaration would warn future developers not to expect a fresh instance.

**TODO comments** — There are no TODO comments in the codebase, which is consistent with the book's advice to use them sparingly and only for things that genuinely cannot be done right now.

---

## Chapter 5: Formatting

**The newspaper metaphor** — The book says a source file should read like a newspaper: the headline at the top, details further down. In every class, public-facing methods appear before private helpers. In `GameApp`, a reader can scan `start()`, `openMenu()`, `stop()`, and `isRunning` without needing to read `#wireHotkeys()`. The decision to read further is the reader's.

**Vertical openness between concepts** — Blank lines separate each method, signalling that they are distinct thoughts. Fields are grouped together without blank lines between them because they are part of the same concept (the class's state). The book calls this *vertical density*: related code is dense, unrelated code is separated.

**Vertical ordering — callers before callees** — In `Hotkeys`, `#dispatch` calls `#findHandler` which is defined directly below it; `#findHandler` calls `#handlers.get()`. The function that calls another appears above the function it calls, so the eye naturally flows downward.

```javascript
#dispatch = (event) => {
  const pressedKey = this.#normalizeKey(event.key)
  const hotkeyConfig = this.#findHandler(pressedKey)
  if (this.#noHandlerFound(hotkeyConfig)) return
  this.#executeHandler(pressedKey, hotkeyConfig)
}
#findHandler(key) { return this.#handlers.get(key) }
#noHandlerFound(config) { return !config }
#executeHandler(key, config) { ... }
```

**Horizontal formatting** — Lines are kept short throughout. No line in the project exceeds 100 characters. The book recommends avoiding horizontal scrolling entirely, and this is respected.

**Indentation** — All files use 2-space indentation consistently. The book emphasises that indentation is not optional — it expresses the hierarchy of scope, and collapsing it removes that information. No file in the project uses inconsistent indentation or tabs.

---

## Chapter 6: Objects and Data Structures

**Data abstraction** — The chapter distinguishes between exposing fields directly and exposing them through an abstraction. The `Element` class never exposes its `#x`, `#y`, or `#id` fields directly — they are accessible only through getters. A caller knows *what* position an element has but not *how* it is stored.

```javascript
export class Element {
  #id
  #x
  #y
  get id() { return this.#id }
  get x()  { return this.#x }
  get y()  { return this.#y }
}
```

**Data/object anti-symmetry** — The book explains that objects hide data and expose behavior, while data structures expose data and have no meaningful behavior. The old `levels.js` used plain objects (`{ type: 'coin', x: 350, y: 550 }`) — those are data structures. The new version uses class instances (`new Coin({ x: 350, y: 550 })`). This matters because `LevelBuilder` can now use `instanceof` to ask an object what it *is*, rather than reaching into a field to read a raw type string.

**Law of Demeter — a violation** — The book's Law of Demeter says a method should only call methods on its own fields, parameters, or locally created objects — not on objects returned by those. `GameApp.stop()` contains:

```javascript
try { this.#game?.player?.remove() } catch {}
```

This is a train wreck: `GameApp` reaches through `#game` to `player` and then calls `remove()`. The book would flag this — `GameApp` should not know that `Game` has a `player` that has a `remove()` method. The fix would be a `cleanup()` or `destroy()` method on `Game` itself, but since `Game` is a third-party class this cannot be changed without wrapping it.

**Data Transfer Objects** — `PLAYER_OPTIONS` and `AUDIO_CONFIG` in `constants.js` are pure data structures (DTOs) — they have no behavior, only properties. The book says this is a legitimate use case at system boundaries (configuration), and `Object.freeze()` makes them immutable, which is appropriate for configuration data.

---

## Chapter 7: Error Handling

**Use exceptions, not return codes** — `getStartButton()` throws a descriptive `Error` rather than returning `null` and forcing the caller to check. The book says returning null is one of the worst things a function can do because every caller must remember to check, and if even one forgets, the application crashes later with no useful message.

```javascript
function getStartButton() {
  const button = document.getElementById(START_BUTTON_ID)
  if (!button) throw new Error(`Start button with id '${START_BUTTON_ID}' not found in DOM`)
  return button
}
```

**Provide context with exceptions** — The error message includes the `START_BUTTON_ID` value, so a developer reading a stack trace knows exactly which element was missing. The book calls this *providing context*: the message should explain the intent of the operation that failed.

**Don't pass null** — `MenuController`'s constructor guards against null arguments:

```javascript
constructor(startButton, app) {
  if (!startButton) throw new Error('MenuController requires a start button')
  if (!app) throw new Error('MenuController requires a GameApp instance')
}
```

The book says passing null is worse than returning null, because it forces the callee to defend itself. These guards make the contract explicit.

**Tension — silent catch blocks** — `GameApp.stop()` uses empty `catch {}` blocks:

```javascript
try { this.#menu.close() } catch {}
try { this.#game?.player?.remove() } catch {}
```

The book discourages swallowing errors silently. The justification here is that these are *best-effort cleanup calls* — the application is already shutting down the game, and a failure to close the menu should not prevent the rest of cleanup from running. A stricter approach would check state before calling (e.g. `if (this.#menuIsOpen)`) to avoid needing the catch at all.

---

## Chapter 8: Boundaries

**Wrapping third-party code** — The book recommends wrapping third-party APIs so that the application depends on its own interface, not the library's. `Music` wraps the browser's `Audio` API: nothing outside `Music` knows about `currentTime`, `paused`, `loop`, or the promise returned by `play()`. If the Audio API changes, only `Music` changes.

**Clean boundaries in `LevelBuilder`** — `LevelBuilder` is the single point of contact with `learn2dgame-js`'s `Coin` and `Obstacle` constructors. The rest of the domain uses the project's own `Coin`, `Platform`, etc. classes. If the library renames a constructor parameter, only `LevelBuilder.#createElement()` needs updating:

```javascript
import { Coin as GameCoin, Obstacle } from '../../node_modules/learn2dgame-js/dist/...'
import { Coin, DeadlyElement, VanishingPlatform } from './Element.js'
```

The `Coin as GameCoin` alias is necessary because the library and the domain model use the same name for different things. The alias keeps the domain names clean and avoids confusion inside `LevelBuilder`.

**Using code that does not yet exist** — The book describes cases where you must work against a boundary that is not yet defined. During development, the exact API of `learn2dgame-js` was not always known in advance. The `LevelBuilder` was written against the domain model first (`instanceof Coin`, `instanceof DeadlyElement`) and the library integration was filled in after — following the book's advice to define the interface you *wish* you had and adapt the third party to fit it.

**Remaining violation** — `GameApp` imports directly from the library's `dist/` path rather than through an adapter module. If the library's file structure changes, every file that imports from it must be updated. The book would recommend a single `lib/gameEngine.js` adapter that re-exports only what the application needs.

---

## Chapter 9: Unit Tests

**No tests exist** — The project has no automated test suite. `package.json` still contains `"test": "echo \"Error: no test specified\""`. This is the honest state, and the book's chapter 9 applies entirely as a gap analysis rather than a confirmation of good practice.

**Three laws of TDD were not followed** — The book's three laws state that you write no production code without a failing test first. None of the code in this module was written test-first. This meant that some design decisions (like `GameApp` creating its own `Music` and `Hotkeys` internally) were made without considering testability, making them harder to test in isolation.

**What would be testable** — The domain model classes (`Level`, `Coin`, `Platform`, `MovingPlatform`) are pure data objects with no browser dependencies — they could be tested in Node.js without a DOM. `Hotkeys` could be tested with a synthetic `KeyboardEvent`. `LevelBuilder` is harder because it creates DOM elements via the library. The refactoring into small classes did improve testability even without tests being written.

**FIRST** — The book's FIRST acronym (Fast, Independent, Repeatable, Self-Validating, Timely) describes what clean tests look like. Tests for `Element` and `Level` would satisfy all five: they have no network calls, no shared state, and they assert a clear boolean outcome. Tests for `GameApp` would fail on *Independent* and *Repeatable* because of the `SceneManager` singleton stored in `window`.

---

## Chapter 10: Classes

**Class organisation** — The book prescribes a specific order: public static constants, private static variables, private instance variables, public functions, private utilities. Every class in the project follows this: private fields are declared at the top, public methods come before private helpers. `GameApp` is a clear example:

```javascript
export class GameApp {
  #game = null       // private instance variables first
  #scenes = null
  #menu = new Menu()
  #music = new Music(AUDIO_CONFIG)
  #hotkeys = new Hotkeys()
  #running = false

  start() { ... }        // public interface
  openMenu() { ... }
  stop() { ... }
  get isRunning() { }

  #wireHotkeys() { }     // private utilities at the bottom
}
```

**Single Responsibility Principle** — The book defines SRP as a class having only one reason to change. `Music` changes only if audio behavior changes. `Hotkeys` changes only if keyboard dispatch logic changes. `MenuController` changes only if the start-button interaction changes. Before refactoring, all of this was in a single file — one change to audio logic could accidentally break menu behavior.

**High cohesion** — The book says methods and variables in a class should be closely related. `Music` is maximally cohesive: every method (`play`, `pause`, `stop`, `#isPaused`, `#restartFromBeginning`, `#resetToStart`, `#createAudioElement`) uses the `#audio` field. No method exists that does not reference the class's state.

**Open-Closed Principle** — The book says classes should be open for extension but closed for modification. The `Element` hierarchy follows this: adding a new element type (e.g. `BouncePlatform`) requires only creating a new subclass and adding one `instanceof` branch in `LevelBuilder.#createElement()` — no existing class needs to change.

**Tension — empty subclasses as type tags** — `VanishingPlatform` and `Coin` have no methods or fields beyond what they inherit. They exist purely so that `instanceof` checks work in `LevelBuilder`. The book would question whether this is truly a behavioral distinction or just a type tag in disguise. The alternative — adding an `isDeadly()` or `disappearsOnLand()` method to `Element` — would be more polymorphic but would push game-engine knowledge into the domain model, which is a different violation.

---

## Chapter 11: Systems

**Separate constructing from using** — The book's core rule for systems is that construction and use should be separated. `index.js` owns the construction of `GameApp` and `MenuController` before any game logic runs. `GameApp.start()` defers the construction of `Game`, `SceneManager`, and the level objects until the user clicks Start — nothing is built until it is needed:

```javascript
// index.js – pure construction
const app = new GameApp()
function initializeApplication() {
  const menu = new MenuController(getStartButton(), app)
  menu.init()
}

// GameApp.start() – deferred construction triggered by user action
start() {
  this.#game = new Game('platform', PLAYER_OPTIONS)
  this.#scenes = new SceneManager()
  for (const level of levels) {
    this.#scenes.add(() => new LevelBuilder(this.#game, level).build(), TARGET_SCORE_PER_LEVEL)
  }
  this.#scenes.set(0)
  ...
}
```

**Separation of main** — The book describes *main* as the place where objects are constructed and wired together before control is handed to the application. `index.js` plays this role: it creates `GameApp`, finds the button, creates `MenuController`, and calls `init()`. After that, control passes to the event-driven game loop and no construction happens in `index.js` again.

**Dependency injection not used** — `GameApp` creates its own `Music`, `Hotkeys`, and `Menu` objects as field initialisers. The book's preferred approach is *dependency injection*: pass these in from outside so that a test can supply a mock `Music` or a fake `Hotkeys`. Because `GameApp` constructs its own dependencies, it is impossible to test in isolation without a real browser. This was a conscious trade-off for simplicity in a small application.

**Singleton problem** — `SceneManager` from `learn2dgame-js` stores itself in `window.__sceneManager`, which means it is a global singleton that the application cannot control. The book warns that singletons make it hard to reason about construction because any part of the system can access them at any time. If `stop()` and `start()` were called multiple times, the singleton would accumulate scene registrations from previous sessions. This is a boundary constraint the library imposes that cannot be fixed without wrapping `SceneManager` entirely.

**Optimise decision making** — The book says the best architecture defers decisions until the last responsible moment. The level data in `levels.js` uses class instances (`new Coin(...)`, `new Platform(...)`) rather than plain objects, which means the structure of each level is defined at module load time. A more flexible design would load level data lazily, but for five hard-coded levels the early binding is acceptable.

---

## References

Martin, R. C. (2008). *Clean Code: A Handbook of Agile Software Craftsmanship*. Prentice Hall.
