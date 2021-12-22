import { VectorFactory } from "matter";
import Phaser from "phaser";
import Magic from "./Magic";
export default class Shooter extends Phaser.Physics.Arcade.Sprite{
    enemyProjectiles!: Phaser.Physics.Arcade.Group
    flipped = false;
    targetx = 100;
    targety = 100;
    health = 100;
    shoot = true;
    time = Date.now();
    private target?: Phaser.Physics.Arcade.Sprite;
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: string|number){
        super(scene,x,y,texture,frame);
        this.anims.play('shooter_idle');
        this.setScale(0.8);
    }
    setTarget(target: Phaser.Physics.Arcade.Sprite, projectiles: Phaser.Physics.Arcade.Group){
        this.targetx = target.x;
        this.targety = target.y;
        this.target = target;
        this.setSize(this.width*0.35, this.height*0.5);
        this.setOffset(25,30);
        this.setImmovable();
        this.enemyProjectiles = projectiles;
        this.time = Date.now();
    }
    removeTarget(){
        this.target = undefined;
    }
    preUpdate(time: number, delta: number){
        super.preUpdate(time, delta);
        if(this.health<0){
            if(Date.now()-this.time>300)
                this.destroy();
            return;
        }

        if(this.target!=undefined){
            this.targetx = this.target.x;
            this.targety = this.target.y;
            const vec = new Phaser.Math.Vector2(this.targetx - this.x, this.targety - this.y)

            if(this.shoot==true&&Date.now()-this.time>3000){
                this.anims.play("shooter_shoot");
                this.time=Date.now();
                let magic = this.enemyProjectiles.get(this.x-20, this.y+20, "magic") as Magic;
                magic.setRotation(vec.angle());
                magic.setSize(magic.height, magic.height);
                magic.setVector(vec);

                magic.setVelocity(vec.normalize().x*1000,vec.normalize().y*1000);
            } else if(Date.now()-this.time<350) this.anims.play("shooter_idle");

            if(vec.normalize().x<0){
                this.setFlipX(true);
                this.setOffset(60,30)
                this.flipped = true;
            } else if(this.flipped == true){
                this.setFlipX(false);
                this.setOffset(25,30)
                this.flipped = false;
            }
        }
    }
    hit(damage: number){
        this.health-=damage;
        if(this.health<0){
            this.shoot = false;
            this.time = Date.now();
            this.anims.play("shooter_dead");                
        }
    }
}
