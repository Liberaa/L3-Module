import { Obstacle, Coin } from '../../node_modules/learn2dgame-js/dist/learn2dgame-js.js'
import { ElementType } from '../config/constants.js'

export function applyLevel(game, level) {
  for (const element of level.elements) {
    createLevelElement(element)
  }
}

function createLevelElement(element) {
  if (isCoin(element)) {
    createCoin(element)
    return
  }
  
  createObstacle(element)
}

function isCoin(element) {
  return element.type === ElementType.COIN
}

function createCoin(element) {
  new Coin(buildCoinConfig(element))
}

function buildCoinConfig(element) {
  return { 
    id: element.id, 
    positionX: element.x, 
    positionY: element.y 
  }
}

function createObstacle(element) {
  const config = buildObstacleConfig(element)
  new Obstacle(config)
}

function buildObstacleConfig(element) {
  return {
    id: element.id,
    positionX: element.x,
    positionY: element.y,
    width: element.width,
    height: element.height,
    color: element.color,
    deadly: isDeadly(element),
    disappearOnLand: shouldDisappearOnLand(element),
    velocityX: getVelocityX(element),
    velocityY: getVelocityY(element)
  }
}

function isDeadly(element) {
  return element.type === ElementType.DEADLY
}

function shouldDisappearOnLand(element) {
  return element.type === ElementType.VANISHING_PLATFORM
}

function getVelocityX(element) {
  const DEFAULT_VELOCITY = 0
  return element.velocityX || DEFAULT_VELOCITY
}

function getVelocityY(element) {
  const DEFAULT_VELOCITY = 0
  return element.velocityY || DEFAULT_VELOCITY
}
