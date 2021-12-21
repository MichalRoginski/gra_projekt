import Phaser from "phaser";

declare global {
    namespace Phaser.GameObjects{
        interface GameObjectFactory
        {
            knight(x:number, y:number, texture:string, frame?:string | number): Knight;
        }
    }
}

export default class Knight extends Phaser.Physics.Arcade.Sprite
{
    constructor(scene: Phaser.Scene, x:number, y:number, texture:string, frame?:string | number)
    {
        super(scene, x, y, texture, frame)
        this.anims.play('knight-idle');
    }

}

Phaser.GameObjects.GameObjectFactory.register('knight', function (this:Phaser.GameObjects.GameObjectFactory, x: number, y:number, texture:string, frame?:string|number){
    var sprite = new Knight(this.scene, x, y, texture, frame);

        this.displayList.add(sprite);
        this.updateList.add(sprite);

        this.scene.physics.world.enableBody(sprite, Phaser.Physics.Arcade.DYNAMIC_BODY);

        sprite.setScale(3);
        sprite.setSize(sprite.width*0.6, sprite.height*0.2);
        sprite.body.setOffset(3, 20);


        return sprite;
})