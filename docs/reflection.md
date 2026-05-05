# Clean Code Reflektion – L3 Module Platformer

**Student:** Lukas Söderlund  
**Kurs:** 1DV610 – L3 Module  
**Datum:** 2026-05-05  
**Repository:** https://github.com/Liberaa/L3-Module

---

## Introduktion

Detta projekt är ett webbaserat 2D-platformspel byggt ovanpå mitt eget npm-paket `learn2dgame-js`. Projektet är uppdelat i flera lager: `app/` för spelorkestrering, `domain/` för spelvärldens modell, `ui/` för gränssnitt och `config/` för konstanter.

Clean Code har påverkat projektet genom att jag har försökt göra koden mer läsbar, mer uppdelad och lättare att ändra. Jag har framför allt fokuserat på tydliga namn, små funktioner, inkapsling, gränser mot externa bibliotek och tydligare klassansvar. Samtidigt finns det delar där principerna inte följs perfekt, antingen på grund av tidsbrist, projektets storlek eller begränsningar i `learn2dgame-js`.

---

## Kapitel 2: Meaningful Names

### Hur kapitlet påverkat koden

Jag har fokuserat på att använda namn som tydligt visar vad något betyder och varför det finns. Tidigare fanns det råa värden direkt i koden, till exempel `20`, `0.3` och `'m'`. Dessa värdes säger inte mycket för en läsare. Därför flyttades de till namngivna konstanter.

```js
// constants.js
export const TARGET_SCORE_PER_LEVEL = 20

export const HOTKEYS = Object.freeze({
  menu: 'm',
  startMusic: 'd',
  restart: 'r'
})

export const AUDIO_CONFIG = Object.freeze({
  src: './music/background.mp3',
  loop: true,
  volume: 0.3
})
```

`TARGET_SCORE_PER_LEVEL` berättar direkt varför värdet `20` finns. `HOTKEYS.menu` är mycket lättare att förstå än en lös bokstav. Det gör även koden mer sökbar.

Klassnamn är substantiv: `GameApp`, `LevelBuilder`, `MenuController`, `Hotkeys`, `Music`. Metoder är verb: `build()`, `attach()`, `detach()`, `play()`, `pause()`, `stop()`.

Privata hjälpmetoder har också fått namn som förklarar intentionen:

```js
#restartFromBeginning()
#normalizeKey()
#isPaused()
#noHandlerFound()
```

`if (this.#isPaused())` läser nästan som vanlig engelska.

### Tension

`DeadlyElement` – ordet `Element` kan ses som ett noise word. Jag valde ändå att behålla det eftersom `Deadly` ensamt hade blivit otydligt. `DeadlyElement` visar både vad objektet gör och att det hör till spelets elementmodell.

---

## Kapitel 3: Functions

### Hur kapitlet påverkat koden

Funktioner ska vara små och göra en sak. Det har påverkat hur `Music` och `Hotkeys` är strukturerade.

```js
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
  this.#audio.currentTime = BEGINNING
}
```

`play()` går att förstå snabbt. Man behöver inte direkt veta hur ljudet startas om.

Duplicering undviks med `#normalizeKey(key)` – regeln för hur tangenter normaliseras finns på ett ställe:

```js
#normalizeKey(key) {
  return key.toLowerCase()
}
```

### Command-query separation

```js
start()       // kommando
stop()        // kommando

get isRunning() {  // query
  return this.#running
}
```

### Tension

`GameApp.start()` gör ganska mycket: skapar spelet, skapar `SceneManager`, registrerar nivåer, startar första scenen, kopplar hotkeys och startar musik. Det sker dock allt på samma abstraktionsnivå (boota spelet), men privata metoder som `#initializeGame()` och `#registerLevels()` hade gjort det renare.

---

## Kapitel 4: Comments

### Hur kapitlet påverkat koden

Kommentarer är ofta ett tecken på att koden inte är tydlig nog. Istället för kommentarer används metodnamn:

```js
// Istället för: // normalize key to lowercase
#normalizeKey(key)

// Istället för: // remove handler after it fires once
#shouldRemoveAfterExecution(config)
```

### Noise comments

I `constants.js` finns kommentarer som inte tillför något:

```js
// Use solution domain names
export const ElementType = Object.freeze({ ... })

// Extract numbers
export const GAME_DIMENSIONS = Object.freeze({ ... })
```

Dessa upprepar bara vad koden visar och bör tas bort.

### Kommentarer som faktiskt behövs

```js
// Browser autoplay policy can reject play() before user interaction.
// This rejection is expected, so it is intentionally ignored.
this.#audio.play().catch(() => {})
```

Här förklarar kommentaren *varför* koden finns, inte bara vad den gör.

---

## Kapitel 5: Formatting

### Hur kapitlet påverkat koden

Klasserna följer en tydlig struktur: privata fält först, publika metoder efter det, privata hjälpmetoder längst ner.

```js
export class GameApp {
  #game = null
  #scenes = null
  #menu = new Menu()
  #music = new Music(AUDIO_CONFIG)
  #hotkeys = new Hotkeys()
  #running = false

  start() { }
  openMenu() { }
  stop() { }

  get isRunning() { }

  #wireHotkeys() { }
}
```

En fil ska läsas som en tidning – det viktigaste och mest publika kommer först.

### Vertikal ordning

En metod som anropar en annan ligger ovanför den metod den anropar:

```js
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
```

Projektet använder 2-space indentation konsekvent och korta rader utan horisontell scrolling.

---

## Kapitel 6: Objects and Data Structures

### Hur kapitlet påverkat koden

`Element` döljer sina fält med privata variabler och exponerar dem via getters:

```js
export class Element {
  #id
  #x
  #y

  get id() { return this.#id }
  get x() { return this.#x }
  get y() { return this.#y }
}
```

Nivåerna gick från rena datastrukturer:

```js
{ type: 'coin', x: 350, y: 550 }
```

till klassinstanser:

```js
new Coin({ x: 350, y: 550 })
new Platform({ x: 100, y: 400 })
```

Det gör att `LevelBuilder` kan använda `instanceof` istället för att läsa råa strängar.

### Law of Demeter

Överträdelse i `GameApp.stop()`:

```js
this.#game?.player?.remove()
```

`GameApp` vet för mycket om `Game`s interna struktur. En renare lösning hade varit `this.#game.cleanup()` – men `Game` kommer från npm-paketet och kan inte ändras direkt.

### DTOs

`PLAYER_OPTIONS` och `AUDIO_CONFIG` är rena datastrukturer utan beteende. `Object.freeze()` gör att de inte kan ändras av misstag:

```js
export const AUDIO_CONFIG = Object.freeze({
  src: './music/background.mp3',
  loop: true,
  volume: 0.3
})
```

---

## Kapitel 7: Error Handling

### Hur kapitlet påverkat koden

Exceptions istället för return codes:

```js
function getStartButton() {
  const button = document.getElementById(START_BUTTON_ID)

  if (!button) {
    throw new Error(`Start button with id '${START_BUTTON_ID}' not found in DOM`)
  }

  return button
}
```

`MenuController` försvarar sig mot ogiltiga argument:

```js
constructor(startButton, app) {
  if (!startButton) throw new Error('MenuController requires a start button')
  if (!app) throw new Error('MenuController requires a GameApp instance')
}
```

### Tension

Tomma catch-block i `GameApp.stop()`:

```js
try { this.#menu.close() } catch {}
try { this.#game?.player?.remove() } catch {}
```

Motivering: detta är best-effort cleanup. Spelet håller redan på att stoppas, och ett fel i en del ska inte hindra resten. En bättre lösning hade dock varit att kontrollera tillståndet innan metoderna anropas.

---

## Kapitel 8: Boundaries

### Hur kapitlet påverkat koden

`Music` fungerar som en wrapper runt browserns Audio API:

```js
const music = new Music(AUDIO_CONFIG)
music.play()
music.pause()
music.stop()
```

Resten av koden behöver inte veta något om `currentTime`, `paused`, `loop`, `volume` eller att `audio.play()` returnerar ett promise.

`LevelBuilder` fungerar som gränsen mot `learn2dgame-js`:

```js
import { Coin as GameCoin, Obstacle } from '../../node_modules/learn2dgame-js/dist/...'
import { Coin, DeadlyElement, VanishingPlatform } from './Element.js'
```

Aliaset `Coin as GameCoin` gör det tydligt vilken version som används. Resten av applikationen arbetar bara med mina egna klasser.

### Remaining violation

`GameApp` importerar fortfarande direkt från bibliotekets `dist/`-path. En bättre lösning hade varit en adapterfil:

```js
// lib/gameEngine.js
export { Game, SceneManager } from 'learn2dgame-js'
```

---

## Kapitel 9: Unit Tests

### Hur kapitlet påverkat koden

Projektet har inga automatiska tester:

```json
"test": "echo \"Error: no test specified\""
```

Det betyder att kapitel 9 främst blir en gap analysis. `GameApp` skapar sina egna beroenden:

```js
#menu = new Menu()
#music = new Music(AUDIO_CONFIG)
#hotkeys = new Hotkeys()
```

Det gör klassen svår att testa isolerat.

### Vad som ändå är testbart

Domain-klasserna `Level`, `Coin`, `Platform` och `MovingPlatform` har inga browser-beroenden och skulle kunna testas i Node.js. `Hotkeys` skulle kunna testas med syntetiska `KeyboardEvent`-objekt.

### FIRST

Tester för `Element` och `Level` skulle uppfylla Fast, Independent, Repeatable, Self-validating och Timely ganska bra. Tester för `GameApp` är svårare eftersom `SceneManager` är en singleton i `window.__sceneManager`.

---

## Kapitel 10: Classes

### Hur kapitlet påverkat koden

Klasser ska vara små och ha ett tydligt ansvar:

- `Music` – ansvarar bara för ljud
- `Hotkeys` – ansvarar bara för tangentbordsgenvägar
- `MenuController` – ansvarar bara för startknappens interaktion
- `GameApp` – orkestrera spelets start och stopp

```js
export class Music {
  #audio

  constructor(config) { this.#audio = this.#createAudioElement(config) }

  play() { }
  pause() { }
  stop() { }

  #isPaused() { }
  #restartFromBeginning() { }
  #resetToStart() { }
  #createAudioElement(config) { }
}
```

`Music` har hög cohesion – alla metoder använder eller påverkar `#audio`.

### Open-Closed Principle

Ny elementtyp kräver bara en ny subklass:

```js
export class BouncePlatform extends Platform {}
```

`LevelBuilder` behöver uppdateras för att översätta den, men de befintliga klasserna behöver inte ändras.

### Tension

Tomma subklasser som `Coin` och `VanishingPlatform` har inga egna metoder. De fungerar som type tags för `instanceof`. Alternativet hade varit polymorfism med metoder som `isDeadly()` eller `disappearsOnLand()`, men då hade domain-modellen behövt känna till spelmotorns beteende. Tomma subklasser är en medveten kompromiss.

---

## Kapitel 11: Systems

### Hur kapitlet påverkat koden

`index.js` fungerar som systemets `main`:

```js
const app = new GameApp()

function initializeApplication() {
  const menu = new MenuController(getStartButton(), app)
  menu.init()
}
```

`GameApp.start()` skapar inte spelet förrän användaren klickar på Start:

```js
start() {
  this.#game = new Game('platform', PLAYER_OPTIONS)
  this.#scenes = new SceneManager()

  for (const level of levels) {
    this.#scenes.add(
      () => new LevelBuilder(this.#game, level).build(),
      TARGET_SCORE_PER_LEVEL
    )
  }

  this.#scenes.set(0)
}
```

### Dependency injection saknas

`GameApp` skapar sina egna dependencies. Med DI hade det sett ut så här:

```js
constructor({ menu, music, hotkeys }) {
  this.#menu = menu
  this.#music = music
  this.#hotkeys = hotkeys
}
```

Det hade gjort klassen lättare att testa. Valt bort på grund av projektets storlek.

### Singleton problem

`SceneManager` från `learn2dgame-js` använder `window.__sceneManager`, vilket gör den till en global singleton. Flera starter kan återanvända samma instans med gamla scener. En wrapper som hanterar reset/cleanup hade löst det.

---

## Sammanfattning

| Kapitel | Förbättring | Svaghet |
|---|---|---|
| Meaningful Names | `TARGET_SCORE_PER_LEVEL`, `HOTKEYS`, tydliga klass- och metodnamn | `DeadlyElement` är ett kompromissnamn |
| Functions | Små metoder, step-down, command-query separation | `GameApp.start()` gör fortfarande ganska mycket |
| Comments | Metodnamn ersätter kommentarer, noise comments identifierade | Saknar förklarande kommentar till tom catch i `play()` |
| Objects | Domain-klasser döljer data, klassinstanser istället för råa objekt | Law of Demeter-brott mot `game.player.remove()` |
| Error Handling | Exceptions med kontext, guard clauses i konstruktorer | Tomma catch-block i cleanup |
| Boundaries | `Music` och `LevelBuilder` som wrappers | Direktimport från `dist/` i `GameApp` |
| Classes | Fokuserade klasser med hög cohesion | Tomma subklasser som type tags |
| Systems | `index.js` som main, lazy construction | Ingen DI, singleton-problem med `SceneManager` |
| Unit Tests | Testbara domain-klasser identifierade | Inga automatiska tester finns |

Den största svagheten är avsaknaden av tester och att `GameApp` skapar sina egna beroenden.

Min viktigaste insikt är att Clean Code handlar om att skriva kod för nästa person som ska läsa den – oavsett om det är en klasskamrat, lärare eller jag själv om några veckor. Principerna är riktlinjer, inte absoluta regler. Ibland kräver projektet kompromisser.

---

## Referens
Renskrivet av Chaptgpt.

Martin, R. C. (2008). *Clean Code: A Handbook of Agile Software Craftsmanship*. Prentice Hall.
