import Phaser from "phaser";
export default class Flyer extends Phaser.Physics.Arcade.Sprite{
    flipped:boolean = false;
    targetx = 100;
    targety = 100;
    health = 100;
    time = Date.now();
    private target?: Phaser.Physics.Arcade.Sprite;
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: string|number){
        super(scene,x,y,texture,frame);
        this.anims.play('flyer_run');
        this.setScale(1.5);
    }
    setTarget(target: Phaser.Physics.Arcade.Sprite){
        this.targetx = target.x;
        this.targety = target.y;
        this.target = target;
        this.setSize(this.width*0.65, this.height*0.65);
        this.setOffset(7,10);
    }
    removeTarget(){
        this.target = undefined;
    }
    preUpdate(time: number, delta: number){
        super.preUpdate(time, delta);
        if(this.health<0){
            this.setVelocity(0,0);
            if(Date.now()-this.time>300)
                this.destroy();
            return;
        }

        if(this.target!=undefined){
            this.targetx = this.target.x;
            this.targety = this.target.y+24;

            const vec = new Phaser.Math.Vector2(this.targetx - this.x, this.targety - this.y)
            this.setVelocity(vec.normalize().x*200, vec.normalize().y*200);
            if(this.body.velocity.x<0){
                this.setFlipX(false);
                this.flipped = true;
            } else if(this.flipped == true){
                this.setFlipX(true);
                this.flipped = false;
            }
        } else this.setVelocity(0,0);
    }
    hit(damage: number){
        this.health-=damage;
        if(this.health<0){
            this.time = Date.now();
            this.anims.play("flyer_dead");                
        }
    }
}
