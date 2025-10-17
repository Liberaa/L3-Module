import { Obstacle, Coin } from '../../node_modules/learn2dgame-js/dist/learn2dgame-js.js'

export function applyLevel(game, level) {
    for (const element of level.elements) {
        if (element.type === 'coin') {
            new Coin({ id: element.id, positionX: element.x, positionY: element.y })
            continue
        }
        const deadly = element.type === 'deadly'
        const disappearOnLand = element.type === 'vanishingPlatform'
        const velocityX = element.velocityX || 0
        const velocityY = element.velocityY || 0
        new Obstacle({
            id: element.id,
            positionX: element.x,
            positionY: element.y,
            width: element.width,
            height: element.height,
            color: element.color,
            deadly,
            disappearOnLand,
            velocityX,
            velocityY
        })
    }
}
