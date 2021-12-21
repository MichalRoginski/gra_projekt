import Phaser from 'phaser'

import Preloader from './scenes/Preloader'
import tBOI from './scenes/tBOI'

const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	width: 800,
	height: 800,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 0 }
		}
	},
	scene: [Preloader,tBOI]
}

export default new Phaser.Game(config)
