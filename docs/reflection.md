# Clean Code Reflection - L3 Assignment

**Student:** Lukas Söderlund (ls224ec)

**Date:** October 21 2025 

---

## Introduction

After my professor's feedback on L2 that my code was "mostly function-oriented" and needed to be "more object-oriented", I completely refactored my L3 app. My old version ([AppWithNpmPackage](https://github.com/Liberaa/AppWithNpmPackage)) was one 200-line JavaScript file :D. This took way longer because I'm still learning OOP, but I can see why it matters.

**Old L3 Repository:** https://github.com/Liberaa/AppWithNpmPackage  
**New L3 Repository:** Current repository : https://github.com/Liberaa/L3-Module 


---

## Chapter 2: Meaningful Names

The book says use names that reveal intention and avoid magic numbers. My old code had random numbers everywhere - `0.3`, `20`, `30` with no explanation. I created `constants.js` where everything has a name: `TARGET_SCORE_PER_LEVEL = 20`, `AUDIO_CONFIG.volume = 0.3`. Now it's easy to find and change values, and to understand them.

**Old L3:**
```javascript
const music = new Audio('./music/background.mp3')
music.volume = 0.3 
scenes.add(level1, 20)  // 20???
new Game('wasd', { movementSpeed: 30 })  // Why 30? xD
```

**New L3:**
```javascript
export const TARGET_SCORE_PER_LEVEL = 20
export const AUDIO_CONFIG = Object.freeze({
  src: '../music/background.mp3',
  volume: 0.3
})
this.#scenes.add(() => applyLevel(this.#game, level), TARGET_SCORE_PER_LEVEL)
```

---

## Chapter 3: Functions

The chapter says functions should be small and do one thing. My professor said to "break down methods using inline comments as names" - exactly what I did. Old code was 200 lines in one file. Now I have tiny functions doing one specific thing each.

**Old L3:**
```javascript
// Everything mixed together in one file
const menu = new Menu()
document.addEventListener('keydown', e => {
    if (e.key.toLowerCase() === 'm') {
        menu.create({ title: 'Pause', buttons: [...] })
    }
})
const music = new Audio('./music/background.mp3')
function level5() {
    if(music.paused) { music.play() }
    // 40 more lines...
}
```

**New L3:**
```javascript
start() {
  if (this.#isAlreadyRunning()) return
  this.#initializeGame()
  this.#setupHotkeys()
}

#initializeGame() {
  this.#running = true
  this.#scenes = new SceneManager()
  this.#game = new Game('platform', PLAYER_OPTIONS)
  this.#loadAllLevels()
  this.#startFirstLevel()
}
```

---

## Chapter 4: Comments

Martin says good code doesn't need comments. My old code had Swedish comments everywhere: `// --- Rörliga obstacles ---`. I removed them by using better function names. Instead of "check if paused", I made `#isPaused()`.

**Old L3:**
```javascript
function level5() {
    // Starta musiken om den är pausad
    if(music.paused) { music.play() }
    // --- Rörliga obstacles ---
    new Obstacle({ positionX: 200, velocityX: 3 })
}
```

**New L3:**
```javascript
play() {
  if (this.#isPaused()) {
    this.#restartFromBeginning()
  }
}

#isPaused() {
  return this.#audio.paused
}
```

---

## Chapter 5: Formatting

My professor said I was missing a `src/` folder structure. I created proper folders: `app/`, `domain/`, `ui/`, `config/`. Way easier to find things than one big file. I do think that this add complexity for a small app like this. 

**Old L3:** Everything in one file  
**New L3:**
```
src/
├── app/GameApp.js, Music.js
├── config/constants.js
├── domain/buildLevel.js, levels.js
├── ui/Hotkeys.js
└── index.js
```

---

## Chapter 6: Objects and Data Structures

This was hardest for me. Daniel said that the code was "mostly function-oriented" and needed to be "more object-oriented". Old code had global variables anyone could mess with. Now I use private fields (`#field`) so only the class controls its data. Hides values and uses oop principles.

**Old L3 (No encapsulation):**
```javascript
// Everything global and exposed
const music = new Audio('./music/background.mp3')
music.loop = true
music.volume = 0.3

function level5() {
    if(music.paused) { music.play() }  // Anyone can access
}
```

**New L3 (OOP - data hidden):**
```javascript
export class Music {
  #audio  // Private! Weyyyyyyy!

  play() {
    if (this.#isPaused()) {
      this.#restartFromBeginning()
    }
  }

  #isPaused() { return this.#audio.paused }
}

export class GameApp {
  #music = new Music(AUDIO_CONFIG)  // Encapsulation baby!
  #running = false
}
```

hide complexity inside objects, very najs great sucess!!

---

## Chapter 7: Error Handling

Old code had no error handling - just crashed if something broke :/.I have dedicated error methods and throw proper errors instead of returning null.

**Old L3:** No error handling at all  
**New L3:**
```javascript
function getStartButton() {
  const button = document.getElementById(START_BUTTON_ID)
  if (!button) {
    throw new Error(`Start button with id '${START_BUTTON_ID}' not found`)
  }
  return button
}

#safelyCloseMenu() {
  try { 
    this.#menu.close() 
  } catch (error) {
    // Already closed
  }
}
```

---

## Chapter 8: Boundaries

Keep third-party code separate. Old version mixed module classes everywhere. Now `buildLevel.js` acts as boundary - if module changes, I only update one file.

**Old L3:**
```javascript
function level1() {
  new Obstacle({ id: 'ground', positionX: -5, ... })
  new Coin({ id: 'gold-coin', positionX: 350, ... })
}
```

**New L3:**
```javascript
// buildLevel.js - Adapter protects my code
export function applyLevel(game, level) {
  for (const element of level.elements) {
    createLevelElement(element)
  }
}

// levels.js - Just data
function createLevel1() {
  return {
    elements: [
      createGround(-5, 780, 2000, 300),
      createCoin('gold-coin', 350, 550)
    ]
  }
}
```

---

## Chapter 9: Unit Tests

Haven't written automated tests yet, but new structure makes testing way easier. Small pure functions like `isCoin()` would be simple to test. Old 200-line file with global state? Impossible to test hihi. But I will use manuell tests instead. 

---

## Chapter 10: Classes

Single Responsibility Principle - each class does one thing. Instead of one file doing everything, now:
- `GameApp` - game lifecycle
- `Music` - audio only
- `Hotkeys` - keyboard only

**Old L3:** No classes, everything procedural  
**New L3:**
```javascript
// Each class has ONE joberino
export class GameApp {
  start() { ... }
  openMenu() { ... }
}

export class Music {
  play() { ... }
  pause() { ... }
}

export class Hotkeys {
  bind() { ... }
  attach() { ... }
}
```

---

## Chapter 11: Systems

Separate construction from use. Old code did everything at once. Now `index.js` sets up the app, `GameApp` runs it.

**Old L3:** Everything happens immediately  
**New L3:**
```javascript
const app = new GameApp()  // Construction

function startGame() {
  app.start()  // Use - controlled
}
```

---

## Overall Reflection

This took 3X longer than my original version because I'm still learning OOP. Had to really think about what should be a class, what should be private, how things communicate. Professor's feedback on L2 about "hiding complexity" was a bit hard to understand for me.

But the transformation from 200-line script to multi-class system was challenging. I kept thinking "is this really necessary?" when creating small classes. But I do se why. If I change how music works, I only touch one file. More developer friendly. 

Being honest, this was frustrating. Writing `#isPaused()` instead of checking `music.paused` felt like extra work. But the new structure is way more maintainable. If someone else works on this, it actually makes sense I think.

The most valuable lesson was understanding the difference between "code that works" and "code that communicates." My old version worked perfectly fine, but it didn't communicate clearly - it relied heavily on comments like `// --- Rörliga obstacles ---` to explain what was happening. The new version tells a story through named constants, small functions, and meaningful class names, making those comments unnecessary. When I replaced `if (this.x < 0)` with `if (this.#hitLeftBoundary())`, the code became self-documenting. This aligns with Chapter 4 (comments are a failure to express yourself in code).

I really pushed myself to understand OOP because of the feedback, instead of just writing functional code. Honestly, the frustration didn’t feel worth it.
Maybe if the project had been bigger and more complex, it would have made sense — but for this one, it was just painful. I spent way too much time on it and lost a lot of sleep :D

---

## References

Martin, R. C. (2008). *Clean Code: A Handbook of Agile Software Craftsmanship*. Prentice Hall.