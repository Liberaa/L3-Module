
export const PLAYER_OPTIONS = Object.freeze({
  movementSpeed: 10,
  jumpStrengthValue: 15
})

export const HOTKEYS = Object.freeze({
  menu: 'm',
  startMusic: 'd',
  restart: 'r'
})

export const AUDIO_CONFIG = Object.freeze({
  src: '../music/background.mp3',
  loop: true,
  volume: 0.3,
  menuKey: HOTKEYS.menu,
  startKey: HOTKEYS.startMusic
})

export const TARGET_SCORE_PER_LEVEL = 20

// Use solution domain names
export const ElementType = Object.freeze({
  GROUND: 'ground',
  PLATFORM: 'platform',
  MOVING_PLATFORM_X: 'movingPlatformX',
  MOVING_PLATFORM_Y: 'movingPlatformY',
  VANISHING_PLATFORM: 'vanishingPlatform',
  DEADLY: 'deadly',
  COIN: 'coin'
})

//  Extract numbers
export const GAME_DIMENSIONS = Object.freeze({
  defaultWidth: 50,
  defaultHeight: 50,
  coinSize: 20
})

export const UI_CONFIG = Object.freeze({
  scorePosition: { top: '10px', left: '10px' },
  scoreFontSize: '18px',
  scoreBackground: 'gray',
  scorePadding: '5px 10px',
  scoreBorderRadius: '15px'
})