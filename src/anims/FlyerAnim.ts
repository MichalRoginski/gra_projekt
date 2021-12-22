import Phaser from "phaser"
const createFlyerAnims = (anims: Phaser.Animations.AnimationManager) =>{
    anims.create({
        key: "flyer_run",
        frames: anims.generateFrameNames("flyer",{ start:0 , end:5, prefix: "sprite_"}),
        yoyo: true,
        repeat: -1,
        frameRate: 10
    })

}
export {
    createFlyerAnims
}