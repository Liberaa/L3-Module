// Here we define multiple levels for the game using factory functions for different elements.
// Develepors can also creat new levels by following the established pattern. <3 
import { ElementType } from '../config/constants.js'

const GROUND_HEIGHT = 300
const GROUND_Y_POSITION = 780
const GROUND_START_X = -5

export const levels = [
  createLevel1(),
  createLevel2(),
  createLevel3(),
  createLevel4(),
  createLevel5()
]

function createLevel1() {
  return {
    elements: [
      createGround(GROUND_START_X, GROUND_Y_POSITION, 2000, GROUND_HEIGHT),
      createPlatform('start-platform', 50, 650, 200, 30, 'gray'),
      createPlatform('bouncy-platform', 850, 400, 150, 20, 'yellow'),
      createPlatform('ice-platform', 1050, 300, 200, 20, 'lightblue'),
      createMovingPlatformX('move-x', 300, 600, 120, 20, 'red', 4),
      createMovingPlatformY('move-y', 600, 500, 120, 20, 'orange', 3),
      createVanishingPlatform('disappear-1', 500, 300, 150, 20, 'pink'),
      createVanishingPlatform('disappear-2', 750, 200, 150, 20, 'cyan'),
      createDeadly('lava-floor', 400, 750, 200, 30),
      createMovingDeadly('spike-block', 1300, 500, 80, 80, 0, 4),
      createCoin('gold-coin', 350, 550),
      createCoin('rare-coin', 1200, 150)
    ]
  }
}

function createLevel2() {
  return {
    elements: [
      createGround(GROUND_START_X, GROUND_Y_POSITION, 2400, 507),
      createPlatform(null, 250, 600, 80, 50, 'purple'),
      createPlatform(null, 450, 500, 80, 50, 'purple'),
      createPlatform(null, 250, 400, 80, 50, 'purple'),
      createPlatform(null, 450, 300, 80, 50, 'purple'),
      createPlatform(null, 975, 400, 80, 50, 'purple'),
      createPlatform(null, 1300, 250, 80, 50, 'red'),
      createCoin(null, 200, 50),
      createCoin(null, 1200, 50)
    ]
  }
}

function createLevel3() {
  return {
    elements: [
      createGround(GROUND_START_X, GROUND_Y_POSITION, 2200, 507),
      createPlatform(null, 1300, 500, 30, 30, 'brown'),
      createPlatform(null, 100, 570, 150, 10),
      createPlatform(null, 100, 170, 150, 10),
      createPlatform(null, 250, 690, 150, 90),
      createPlatform(null, 400, 350, 50, 50),
      createPlatform(null, 520, 110, 150, 290),
      createPlatform(null, 900, 330, 10, 5),
      createCoin(null, 1500, 430),
      createCoin(null, 330, 430),
      createCoin(null, 630, 10),
      createCoin(null, 2, 750)
    ]
  }
}

function createLevel4() {
  return {
    elements: [
      createGround(GROUND_START_X, GROUND_Y_POSITION, 2800, 507),
      createPlatform(null, 100, 600, 80, 50, 'purple'),
      createPlatform(null, 400, 500, 80, 50, 'purple'),
      createPlatform(null, 700, 400, 80, 50, 'purple'),
      createPlatform(null, 1000, 300, 80, 50, 'purple'),
      createPlatform(null, 1300, 500, 80, 50, 'red'),
      createCoin(null, 1330, 450),
      createCoin(null, 870, 250)
    ]
  }
}

function createLevel5() {
  return {
    elements: [
      createGround(GROUND_START_X, GROUND_Y_POSITION, 1800, 507),
      createPlatform(null, 1000, 500, 300, 50, 'brown'),
      createPlatform(null, 100, 570, 150, 10),
      createPlatform(null, 100, 170, 150, 10),
      createPlatform(null, 250, 690, 150, 90),
      createPlatform(null, 400, 350, 150, 50),
      createPlatform(null, 900, 330, 150, 50),
      createMovingPlatformX(null, 200, 250, 120, 20, 'red', 3),
      createMovingPlatformY(null, 700, 200, 100, 20, 'orange', 2),
      createMovingPlatformX(null, 500, 600, 50, 50, 'green', -4),
      createVanishingPlatform(null, 300, 450, 120, 20, 'pink'),
      createVanishingPlatform(null, 750, 150, 150, 20, 'cyan'),
      createDeadly(null, 1200, 700, 150, 20),
      createMovingDeadly(null, 600, 500, 100, 20, 2, 0),
      createCoin(null, 1500, 430),
      createCoin(null, 330, 430),
      createCoin(null, 630, 130),
      createCoin(null, 2, 750)
    ]
  }
}

// Helper factory functions - Chapter 3: Use descriptive names
function createGround(x, y, width, height) {
  return { 
    type: ElementType.GROUND, 
    x, 
    y, 
    width, 
    height, 
    color: 'purple' 
  }
}

function createPlatform(id, x, y, width, height, color = 'gray') {
  return { 
    type: ElementType.PLATFORM, 
    id, 
    x, 
    y, 
    width, 
    height, 
    color 
  }
}

function createMovingPlatformX(id, x, y, width, height, color, velocityX) {
  return { 
    type: ElementType.MOVING_PLATFORM_X, 
    id, 
    x, 
    y, 
    width, 
    height, 
    color, 
    velocityX 
  }
}

function createMovingPlatformY(id, x, y, width, height, color, velocityY) {
  return { 
    type: ElementType.MOVING_PLATFORM_Y, 
    id, 
    x, 
    y, 
    width, 
    height, 
    color, 
    velocityY 
  }
}
