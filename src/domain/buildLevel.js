import { Obstacle, Coin } from '../../node_modules/learn2dgame-js/dist/learn2dgame-js.js'


export function applyLevel(game, level) {
    for (const element of level.elements) {
        if (element.type === 'coin') {
            new Coin({ id: element.id, positionX: element.x, positionY: element.y })
            continue
        }
    }
}
