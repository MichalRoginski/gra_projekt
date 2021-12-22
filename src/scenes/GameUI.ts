import Phaser from "phaser";
import { sceneEvents } from '../events/EventsCenter'


export default class GameUI extends Phaser.Scene {
    private hearts!: Phaser.GameObjects.Group
    private coinsCounter: string = '0';
    
    constructor(){
        super({key: 'game-ui'});
    }

    create(){
        const coinsLabel = this.add.text(150, 2, 'Coins: 0');
        coinsLabel.setScale(2.5);
        sceneEvents.on('player-coins-changed', (coins:number) =>{
            if (coinsLabel.text == null) {
                return;                
            }
            coinsLabel.destroy();
            let coinsLabel1 =this.add.text(150, 2, "Coins: "+ coins.toString());
            coinsLabel1.setScale(2.5);
        })

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