import Phaser from "phaser";
export default class Lizard extends Phaser.Physics.Arcade.Sprite{
    flipped:boolean = false;
    targetx = 100;
    targety = 100;
    private target?: Phaser.Physics.Arcade.Sprite;
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: string|number){
        super(scene,x,y,texture,frame);
        this.anims.play('flyer_run');
        this.setScale(2.5);
    }
    setTarget(target: Phaser.Physics.Arcade.Sprite){
        this.targetx = target.x;
        this.targety = target.y;
        this.target = target;
        this.setSize(this.width*0.45, this.height*0.5);
    }
    protected preUpdate(time: number, delta: number): void {
        super.preUpdate(time, delta);
        if(this.target!=undefined){
            this.targetx = this.target.x;
            this.targety = this.target.y+24;
        }
        const vec = new Phaser.Math.Vector2(this.targetx - this.x, this.targety - this.y)
        this.setVelocity(vec.normalize().x*200, vec.normalize().y*200);
        if(this.body.velocity.x<0){
            this.setFlipX(true);
            this.flipped = true;
        } else if(this.flipped == true){
            this.setFlipX(false);
            this.flipped = false;
        }

    }
}
