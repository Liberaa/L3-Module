export const PLAYER_OPTIONS = Object.freeze({
  movementSpeed: 10,
  jumpStrengthValue: 15
})

export const AUDIO_CONFIG = Object.freeze({
  src: '../music/background.mp3',
  loop: true,
  volume: 0.3
})

export const HOTKEYS = Object.freeze({
  menu: 'm',
  music: 'd',
  restart: 'r'
})

export const TARGET_SCORE_PER_LEVEL = 20

export const ElementType = Object.freeze({
  ground: 'ground',
  platform: 'platform',
  movingPlatformX: 'movingPlatformX',
  movingPlatformY: 'movingPlatformY',
  vanishingPlatform: 'vanishingPlatform',
  deadly: 'deadly',
  coin: 'coin'
})
