import Phaser from 'phaser'

import Preloader from './scenes/Preloader'
import tBOI from './scenes/tBOI'
import GameUI from './scenes/GameUI'
import tBOI_2 from './scenes/tBOI_2'
import tBOI_3 from './scenes/tBOI_3'
import tBOI_4 from './scenes/tBOI_4'
import tBOI_5 from './scenes/tBOI_5'

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
	scene: [Preloader, tBOI, tBOI_2, tBOI_3, tBOI_4, tBOI_5, GameUI]
}

export default new Phaser.Game(config)
