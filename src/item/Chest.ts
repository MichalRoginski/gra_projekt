import Phaser from "phaser";

export default class Chest extends Phaser.Physics.Arcade.Sprite
{
    constructor(scene: Phaser.Scene, x: number, y: number, texture:string, frame: string| number){
        super(scene, x, y, texture, frame)
        this.setScale(3);
        //this.anims.play("chest_closed");
    }

    open(){
        //if(this.anims.currentAnim.key !== 'chest-closed'){
        //    return 0;
        //}
        this.anims.play('chest-open');
        return Phaser.Math.Between(10, 50);
        
    }
}