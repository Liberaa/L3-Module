import { GameApp } from './app/GameApp.js'

function byId(id) {
  const el = document.getElementById(id)
  if (!el) throw new Error(`#${id} not found`)
  return el
}

const app = new GameApp()

function boot() {
  const startButton = byId('btnStart')

  startButton.addEventListener('click', () => {
    if (app.isRunning) return
    app.start()
    startButton.style.display = 'none'
  })
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot, { once: true })
} else {
  boot()
}
