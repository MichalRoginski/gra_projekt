import Phaser from "phaser";
export default class Magic extends Phaser.Physics.Arcade.Image{
    private vector?: Phaser.Math.Vector2;
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: string|number){
        super(scene,x,y,texture,frame);    
    }
    setVector(vector: Phaser.Math.Vector2){
        this.vector = vector;
    }
    getVector(){
        return this.vector;
    }

}