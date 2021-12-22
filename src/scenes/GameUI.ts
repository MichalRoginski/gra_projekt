import Phaser from "phaser";
import { sceneEvents } from '../events/EventsCenter'


export default class GameUI extends Phaser.Scene {
    private hearts!: Phaser.GameObjects.Group
    
    constructor(){
        super({key: 'game-ui'});
    }

    create(){
        this.hearts = this.add.group({
            classType: Phaser.GameObjects.Image
        })

        this.hearts.createMultiple({
            key: 'ui-heart-full',
            setXY: {
                x:20,
                y:15,
                stepX:35,
            },
            quantity: 3
        })
        this.hearts.scaleXY(1.2, 1.2);

        sceneEvents.on('player-health-change', this.handlePlayerHealthChanged, this)
    }

    private handlePlayerHealthChanged(health:number){
        this.hearts.children.each((x, index)=>{
            const heart = x as Phaser.GameObjects.Image;
            if(index < health){
                heart.setTexture('ui-heart-full');
            } else {
                heart.setTexture('ui-heart-empty');
            }
        })
    }
}