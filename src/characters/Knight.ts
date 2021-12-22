import Phaser, { Data, Physics, Time } from "phaser";
import Arrow from "../characters/Arrow"

declare global {
    namespace Phaser.GameObjects{
        interface GameObjectFactory
        {
            knight(x:number, y:number, texture:string, frame?:string | number): Knight;
        }
    }
}

enum HealthState
{
    IDLE,
    DAMAGE
}

export default class Knight extends Phaser.Physics.Arcade.Sprite
{
    private lastShot = Date.now();
    private friendlyProjectiles?: Phaser.Physics.Arcade.Group;
    private power = 51;
    private healthState = HealthState.IDLE;
    private damageTime = 0;
    private _health = 3

    get health(){
        return this._health;
    }

    constructor(scene: Phaser.Scene, x:number, y:number, texture:string, frame?:string | number)
    {
        super(scene, x, y, texture, frame)
        this.anims.play('knight-idle');
    }
    public setFriendlyProjectiles(projectiles: Phaser.Physics.Arcade.Group){
        this.friendlyProjectiles = projectiles;
    }

    handleDamage(dir: Phaser.Math.Vector2){
        this.setVelocity(dir.x*600, dir.y*600);
        if(this.healthState == HealthState.DAMAGE){
            return;
        }
        this.setTint(0xff0000);

        this.healthState = HealthState.DAMAGE;
        this.damageTime = 0;

        --this._health;

        if(this._health == 0){
            
        }
    }

    preUpdate(t: number, dt: number){
        super.preUpdate(t, dt);
        switch (this.healthState)
        {
            case HealthState.IDLE:
                break
            case HealthState.DAMAGE:
                this.damageTime += dt;
                if (this.damageTime >= 750)
                {
                    this.healthState = HealthState.IDLE;
                    this.setTint(0xffffff);
                    this.damageTime = 0;
                }
                break
        }
    }

    update(cursors: Phaser.Types.Input.Keyboard.CursorKeys, scene: Phaser.Scene){
        
        if(this.damageTime <=200 && this.healthState === HealthState.DAMAGE)
        {
            return
        }
        if(this.health == 0)
        {
            return;
        }
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
        
        let aKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        let sKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        let dKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        let wKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);

        if (aKey.isDown){
            velocityx = -speed;
            this.setFlipX(true);
        } else if (dKey.isDown){
            velocityx = speed;
            this.setFlipX(false);
        }
        if (wKey.isDown){
            velocityy = -speed;
        } else if (sKey.isDown){
            velocityy = speed;
        }
        if (cursors.left.isDown){
            this.setFlipX(true);
            if(Date.now()-this.lastShot>500){
                this.Shoot("left");
                this.lastShot = Date.now();
            }            
        } else if (cursors.right.isDown){
            this.setFlipX(false);
            if(Date.now()-this.lastShot>500){
                this.Shoot("right");
                this.lastShot = Date.now();
            }
        }
        if (Date.now()-this.lastShot>500&&cursors.up.isDown){
            this.Shoot("up");
            this.lastShot = Date.now();
        } else if (Date.now()-this.lastShot>500&&cursors.down.isDown){
            this.Shoot("down");
            this.lastShot = Date.now();
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
    private Shoot(direction: string){
        if(this.friendlyProjectiles==undefined){
            return;
        }
        let angle, x=0, y=0;
        if(direction=="up"){
            angle=-Math.PI/2;
            y=-1000;
        }else if(direction=="down"){
            angle=Math.PI/2;
            y=1000;
        }else if(direction=="left"){
            angle=Math.PI;
            x=-1000;
        }else if(direction=="right"){
            angle=0;
            x=1000;
        }
        const arrow = this.friendlyProjectiles.get(this.x, this.y, "arrow") as Arrow;
        arrow.setDamage(this.power);
        arrow.setScale(2);
        arrow.setRotation(angle);
        arrow.setVelocity(x,y);
    }
}

Phaser.GameObjects.GameObjectFactory.register('knight', function (this:Phaser.GameObjects.GameObjectFactory, x: number, y:number, texture:string, frame?:string|number){
    var sprite = new Knight(this.scene, x, y, texture, frame);

    this.displayList.add(sprite);
    this.updateList.add(sprite);

    this.scene.physics.world.enableBody(sprite, Phaser.Physics.Arcade.DYNAMIC_BODY);

    sprite.setImmovable();
    sprite.setScale(3);
    sprite.setSize(sprite.width*0.6, sprite.height*0.2);
    sprite.body.setOffset(3, 20);

    return sprite;
})