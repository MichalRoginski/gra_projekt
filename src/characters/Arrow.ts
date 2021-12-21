import Phaser from "phaser";
export default class Arrow extends Phaser.Physics.Arcade.Image{
    private damage;
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: string|number){
        super(scene,x,y,texture,frame);
    }
    public setDamage(damage: number){
        this.damage = damage;
    }
    public getDamage(){
        return this.damage;
    }
}