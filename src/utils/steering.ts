import Phaser from "phaser";
const Steer = (scene: Phaser.Scene, knight: Phaser.Physics.Arcade.Sprite, cursors: Phaser.Types.Input.Keyboard.CursorKeys) =>{
    const speed = 300;
        let velocityx: number;
        let velocityy: number;
        velocityx = 0;
        velocityy = 0;
        knight.setVelocity(0, 0);
        
        let aKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        let sKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        let dKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        let wKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);

        if (aKey.isDown){
            velocityx = -speed;
            knight.setFlipX(true);
        } else if (dKey.isDown){
            velocityx = speed;
            knight.setFlipX(false);
        }
        if (wKey.isDown){
            velocityy = -speed;
        } else if (sKey.isDown){
            velocityy = speed;
        }

        if (cursors.left.isDown){
            velocityx = -speed;
            knight.setFlipX(true);
        } else if (cursors.right.isDown){
            velocityx = speed;
            knight.setFlipX(false);
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
            knight.anims.play('knight-idle');
        } else{
            knight.anims.play('knight-run', true);
        }
        knight.setVelocity(velocityx, velocityy);
}
const Shoot = (direction: string) =>{

}

export {
    Steer
}
