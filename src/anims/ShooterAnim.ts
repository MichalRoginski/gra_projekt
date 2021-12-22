import Phaser from "phaser"
const createShooterAnims = (anims: Phaser.Animations.AnimationManager) =>{
    anims.create({
        key: "shooter_idle",
        frames: anims.generateFrameNames("shooter_idle",{ start:1 , end:3, prefix: "idle"}),
        frameRate: 5,
        yoyo: true,
        repeat: -1
    })
    anims.create({
        key: "shooter_shoot",
        frames: anims.generateFrameNames("shooter_shoot",{ start:0 , end:4, prefix: "hurt"}),
        frameRate: 13,
        yoyo: true
    })
    anims.create({
        key: "shooter_dead",
        frames: anims.generateFrameNames("shooter_dead",{ start:1 , end:6, prefix: "death"}),
        frameRate: 30,
    })
   
}
export {
    createShooterAnims
}