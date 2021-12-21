import Phaser from "phaser";
export default class Spike extends Phaser.Physics.Arcade.Sprite{
    private time = Date.now();
    private status = "setup";
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: string|number){
        super(scene,x,y,texture,frame);
        this.setScale(3);
    }
    preUpdate(time: number, delta: number): void {
        super.preUpdate(time, delta);

        if(this.status=="setup"){
            this.setImmovable();
            this.setSize(this.width*0.8,this.width*0.8);
            this.status = "wait";
            this.body.enable = false;
        }

        if(this.status=="wait"&&Date.now()-this.time>500){
            this.anims.play('spike_wait');
            this.status = "showing";
            this.time = Date.now();
            
        } else if(this.status=="showing"&&Date.now()-this.time>3000){
            this.anims.play('spike_show');
            this.status = "stabbing";
            this.time = Date.now();
            
        } else if(this.status=="stabbing"&&Date.now()-this.time>500){
            this.body.enable = true;    
            this.anims.play('spike_stab');
            this.status = "retracting";
            this.time = Date.now();
        } else if(this.status=="retracting"&&Date.now()-this.time>2000){    
            this.anims.play('spike_retract');
            this.status = "wait";
            this.time = Date.now();
            this.body.enable = false;
        }
    }
}
