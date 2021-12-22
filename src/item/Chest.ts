import Phaser from "phaser";

export default class Chest extends Phaser.Physics.Arcade.Sprite
{
    private isOpen:boolean = false;
    constructor(scene: Phaser.Scene, x: number, y: number, texture:string, frame: string| number){
        super(scene, x, y, texture, frame)
        this.setScale(3);
    }

    open(){
        if(this.isOpen){
            return 0;
        }else{
            this.isOpen = true;
            this.anims.play('chest_open');
            return Phaser.Math.Between(10, 50);
        }
    }
}