import { GameApp } from './app/GameApp.js'
import { MenuController } from './ui/MenuController.js'

const START_BUTTON_ID = 'btnStart'
const app = new GameApp()

function initializeApplication() {
  const startButton = getStartButton()
  const menu = new MenuController(startButton, app)
  menu.init()
}

function getStartButton() {
  const button = document.getElementById(START_BUTTON_ID)
  if (!button) throw new Error(`Start button with id '${START_BUTTON_ID}' not found in DOM`)
  return button
}

if (document.readyState !== 'loading') {
  initializeApplication()
} else {
  document.addEventListener('DOMContentLoaded', initializeApplication, { once: true })
}
