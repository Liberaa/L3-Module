import { GameApp } from './app/GameApp.js'

const START_BUTTON_ID = 'btnStart'
const app = new GameApp()

function initializeApplication() {
  if (isDocumentReady()) {
    setupStartButton()
  } else {
    waitForDocumentReady()
  }
}

function isDocumentReady() {
  return document.readyState !== 'loading'
}

function waitForDocumentReady() {
  document.addEventListener('DOMContentLoaded', setupStartButton, { once: true })
}

function setupStartButton() {
  const startButton = getStartButton()
  attachStartHandler(startButton)
}

function getStartButton() {
  const button = document.getElementById(START_BUTTON_ID)

  if (!button) {
    throw new Error(`Start button with id '${START_BUTTON_ID}' not found in DOM`)
  }

  return button
}

function attachStartHandler(button) {
  button.addEventListener('click', () => handleStartClick(button))
}

function handleStartClick(button) {
  if (isGameAlreadyRunning()) return

  startGame()
  hideStartButton(button)
}

function isGameAlreadyRunning() {
  return app.isRunning
}

function startGame() {
  app.start()
}

function hideStartButton(button) {
  button.style.display = 'none'
}

initializeApplication()