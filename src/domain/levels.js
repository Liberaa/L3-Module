import { Level } from './Level.js'
import { Coin, Platform, MovingPlatform, VanishingPlatform, DeadlyElement } from './Element.js'

export const levels = [
  new Level([
    new Platform({ x: -5, y: 780, width: 2000, height: 300, color: 'purple' }),
    new Platform({ id: 'start-platform', x: 50, y: 650, width: 200, height: 30, color: 'gray' }),
    new Platform({ id: 'bouncy-platform', x: 850, y: 400, width: 150, height: 20, color: 'yellow' }),
    new Platform({ id: 'ice-platform', x: 1050, y: 300, width: 200, height: 20, color: 'lightblue' }),
    new MovingPlatform({ id: 'move-x', x: 300, y: 600, width: 120, height: 20, color: 'red', velocityX: 4 }),
    new MovingPlatform({ id: 'move-y', x: 600, y: 500, width: 120, height: 20, color: 'orange', velocityY: 3 }),
    new VanishingPlatform({ id: 'disappear-1', x: 500, y: 300, width: 150, height: 20, color: 'pink' }),
    new VanishingPlatform({ id: 'disappear-2', x: 750, y: 200, width: 150, height: 20, color: 'cyan' }),
    new DeadlyElement({ id: 'lava-floor', x: 400, y: 750, width: 200, height: 30 }),
    new DeadlyElement({ id: 'spike-block', x: 1300, y: 500, width: 80, height: 80, velocityY: 4 }),
    new Coin({ id: 'gold-coin', x: 350, y: 550 }),
    new Coin({ id: 'rare-coin', x: 1200, y: 150 })
  ]),
  new Level([
    new Platform({ x: -5, y: 780, width: 2400, height: 507, color: 'purple' }),
    new Platform({ x: 250, y: 600, width: 80, height: 50, color: 'purple' }),
    new Platform({ x: 450, y: 500, width: 80, height: 50, color: 'purple' }),
    new Platform({ x: 250, y: 400, width: 80, height: 50, color: 'purple' }),
    new Platform({ x: 450, y: 300, width: 80, height: 50, color: 'purple' }),
    new Platform({ x: 975, y: 400, width: 80, height: 50, color: 'purple' }),
    new Platform({ x: 1300, y: 250, width: 80, height: 50, color: 'red' }),
    new Coin({ x: 200, y: 50 }),
    new Coin({ x: 1200, y: 50 })
  ]),
  new Level([
    new Platform({ x: -5, y: 780, width: 2200, height: 507, color: 'purple' }),
    new Platform({ x: 1300, y: 500, width: 30, height: 30, color: 'brown' }),
    new Platform({ x: 100, y: 570, width: 150, height: 10 }),
    new Platform({ x: 100, y: 170, width: 150, height: 10 }),
    new Platform({ x: 250, y: 690, width: 150, height: 90 }),
    new Platform({ x: 400, y: 350, width: 50, height: 50 }),
    new Platform({ x: 520, y: 110, width: 150, height: 290 }),
    new Platform({ x: 900, y: 330, width: 10, height: 5 }),
    new Coin({ x: 1500, y: 430 }),
    new Coin({ x: 330, y: 430 }),
    new Coin({ x: 630, y: 10 }),
    new Coin({ x: 2, y: 750 })
  ]),
  new Level([
    new Platform({ x: -5, y: 780, width: 2800, height: 507, color: 'purple' }),
    new Platform({ x: 100, y: 600, width: 80, height: 50, color: 'purple' }),
    new Platform({ x: 400, y: 500, width: 80, height: 50, color: 'purple' }),
    new Platform({ x: 700, y: 400, width: 80, height: 50, color: 'purple' }),
    new Platform({ x: 1000, y: 300, width: 80, height: 50, color: 'purple' }),
    new Platform({ x: 1300, y: 500, width: 80, height: 50, color: 'red' }),
    new Coin({ x: 1330, y: 450 }),
    new Coin({ x: 870, y: 250 })
  ]),
  new Level([
    new Platform({ x: -5, y: 780, width: 1800, height: 507, color: 'purple' }),
    new Platform({ x: 1000, y: 500, width: 300, height: 50, color: 'brown' }),
    new Platform({ x: 100, y: 570, width: 150, height: 10 }),
    new Platform({ x: 100, y: 170, width: 150, height: 10 }),
    new Platform({ x: 250, y: 690, width: 150, height: 90 }),
    new Platform({ x: 400, y: 350, width: 150, height: 50 }),
    new Platform({ x: 900, y: 330, width: 150, height: 50 }),
    new MovingPlatform({ x: 200, y: 250, width: 120, height: 20, color: 'red', velocityX: 3 }),
    new MovingPlatform({ x: 700, y: 200, width: 100, height: 20, color: 'orange', velocityY: 2 }),
    new MovingPlatform({ x: 500, y: 600, width: 50, height: 50, color: 'green', velocityX: -4 }),
    new VanishingPlatform({ x: 300, y: 450, width: 120, height: 20, color: 'pink' }),
    new VanishingPlatform({ x: 750, y: 150, width: 150, height: 20, color: 'cyan' }),
    new DeadlyElement({ x: 1200, y: 700, width: 150, height: 20 }),
    new DeadlyElement({ x: 600, y: 500, width: 100, height: 20, velocityX: 2 }),
    new Coin({ x: 1500, y: 430 }),
    new Coin({ x: 330, y: 430 }),
    new Coin({ x: 630, y: 130 }),
    new Coin({ x: 2, y: 750 })
  ])
]
