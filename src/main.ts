import Phaser from 'phaser'

import Preloader from './scenes/Preloader'
import tBOI from './scenes/tBOI'
import GameUI from './scenes/GameUI'

const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	width: 1200,
	height: 720,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 0 },
			debug: false
		}
	},
	scene: [Preloader,tBOI, GameUI]
}

export default new Phaser.Game(config)
