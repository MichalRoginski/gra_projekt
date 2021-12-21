import Phaser, { Physics } from "phaser";

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

    update(cursors: Phaser.Types.Input.Keyboard.CursorKeys){
        
        if(!cursors)
        {
            return
        }

        const speed = 300;
        let velocityx: number;
        let velocityy: number;
        velocityx = 0;
        velocityy = 0;
        this.setVelocity(0, 0);
        
        
        if (cursors.left.isDown){
            velocityx = -speed;
            this.setFlipX(true);
        } else if (cursors.right.isDown){
            velocityx = speed;
            this.setFlipX(false);
        }
        if (cursors.up.isDown){
            velocityy = -speed;
        } else if (cursors.down.isDown){
            velocityy = speed;
        }
        if(velocityx != 0 && velocityy != 0){
            velocityx/=1.42;
            velocityy/=1.42;    
        }
        if(velocityx == 0 && velocityy == 0){
            this.anims.play('knight-idle');
        } else{
            this.anims.play('knight-run', true);
        }
        this.setVelocity(velocityx, velocityy);
        
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