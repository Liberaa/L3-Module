export const levels = [
  {
    elements: [
      { type: 'ground', x: -5, y: 780, width: 2000, height: 300, color: 'purple' },
      { type: 'platform', id: 'start-platform', x: 50, y: 650, width: 200, height: 30, color: 'gray' },
      { type: 'platform', id: 'bouncy-platform', x: 850, y: 400, width: 150, height: 20, color: 'yellow', bounce: true },
      { type: 'platform', id: 'ice-platform', x: 1050, y: 300, width: 200, height: 20, color: 'lightblue', ice: true },
      { type: 'movingPlatformX', id: 'move-x', x: 300, y: 600, width: 120, height: 20, color: 'red', velocityX: 4 },
      { type: 'movingPlatformY', id: 'move-y', x: 600, y: 500, width: 120, height: 20, color: 'orange', velocityY: 3 },
      { type: 'vanishingPlatform', id: 'disappear-1', x: 500, y: 300, width: 150, height: 20, color: 'pink' },
      { type: 'vanishingPlatform', id: 'disappear-2', x: 750, y: 200, width: 150, height: 20, color: 'cyan' },
      { type: 'deadly', id: 'lava-floor', x: 400, y: 750, width: 200, height: 30 },
      { type: 'deadly', id: 'spike-block', x: 1300, y: 500, width: 80, height: 80, velocityY: 4 },
      { type: 'coin', id: 'gold-coin', x: 350, y: 550 },
      { type: 'coin', id: 'rare-coin', x: 1200, y: 150 }
    ]
  },
  {
    elements: [
      { type: 'ground', x: -5, y: 780, width: 2400, height: 507, color: 'purple' },
      { type: 'platform', x: 250, y: 600, width: 80, height: 50, color: 'purple' },
      { type: 'platform', x: 450, y: 500, width: 80, height: 50, color: 'purple' },
      { type: 'platform', x: 250, y: 400, width: 80, height: 50, color: 'purple' },
      { type: 'platform', x: 450, y: 300, width: 80, height: 50, color: 'purple' },
      { type: 'platform', x: 975, y: 400, width: 80, height: 50, color: 'purple' },
      { type: 'platform', x: 1300, y: 250, width: 80, height: 50, color: 'red' },
      { type: 'coin', x: 200, y: 50 },
      { type: 'coin', x: 1200, y: 50 }
    ]
  },
  {
    elements: [
      { type: 'ground', x: -5, y: 780, width: 2200, height: 507, color: 'purple' },
      { type: 'platform', x: 1300, y: 500, width: 30, height: 30, color: 'brown' },
      { type: 'platform', x: 100, y: 570, width: 150, height: 10 },
      { type: 'platform', x: 100, y: 170, width: 150, height: 10 },
      { type: 'platform', x: 250, y: 690, width: 150, height: 90 },
      { type: 'platform', x: 400, y: 350, width: 50, height: 50 },
      { type: 'platform', x: 520, y: 110, width: 150, height: 290 },
      { type: 'platform', x: 900, y: 330, width: 10, height: 5 },
      { type: 'coin', x: 1500, y: 430 },
      { type: 'coin', x: 330, y: 430 },
      { type: 'coin', x: 630, y: 10 },
      { type: 'coin', x: 2, y: 750 }
    ]
  },
  {
    elements: [
      { type: 'ground', x: -5, y: 780, width: 2800, height: 507, color: 'purple' },
      { type: 'platform', x: 100, y: 600, width: 80, height: 50, color: 'purple' },
      { type: 'platform', x: 400, y: 500, width: 80, height: 50, color: 'purple' },
      { type: 'platform', x: 700, y: 400, width: 80, height: 50, color: 'purple' },
      { type: 'platform', x: 1000, y: 300, width: 80, height: 50, color: 'purple' },
      { type: 'platform', x: 1300, y: 500, width: 80, height: 50, color: 'red' },
      { type: 'coin', x: 1330, y: 450 },
      { type: 'coin', x: 870, y: 250 }
    ]
  },
  {
    elements: [
      { type: 'ground', x: -5, y: 780, width: 1800, height: 507, color: 'purple' },
      { type: 'platform', x: 1000, y: 500, width: 300, height: 50, color: 'brown' },
      { type: 'platform', x: 100, y: 570, width: 150, height: 10 },
      { type: 'platform', x: 100, y: 170, width: 150, height: 10 },
      { type: 'platform', x: 250, y: 690, width: 150, height: 90 },
      { type: 'platform', x: 400, y: 350, width: 150, height: 50 },
      { type: 'platform', x: 900, y: 330, width: 150, height: 50 },
      { type: 'movingPlatformX', x: 200, y: 250, width: 120, height: 20, color: 'red', velocityX: 3 },
      { type: 'movingPlatformY', x: 700, y: 200, width: 100, height: 20, color: 'orange', velocityY: 2 },
      { type: 'movingPlatformX', x: 500, y: 600, width: 50, height: 50, color: 'green', velocityX: -4 },
      { type: 'vanishingPlatform', x: 300, y: 450, width: 120, height: 20, color: 'pink' },
      { type: 'vanishingPlatform', x: 750, y: 150, width: 150, height: 20, color: 'cyan' },
      { type: 'deadly', x: 1200, y: 700, width: 150, height: 20 },
      { type: 'deadly', x: 600, y: 500, width: 100, height: 20, velocityX: 2 },
      { type: 'coin', x: 1500, y: 430 },
      { type: 'coin', x: 330, y: 430 },
      { type: 'coin', x: 630, y: 130 },
      { type: 'coin', x: 2, y: 750 }
    ]
  }
]
