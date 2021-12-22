import Phaser from "phaser"
const createChestAnims = (anims: Phaser.Animations.AnimationManager) =>{
    anims.create({
        key: "chest_open",
        frames: anims.generateFrameNames("chest_open",{ start:0 , end:2, prefix: "chest_full_open_anim_f"}),
        frameRate: 15
    })
}
export {
    createChestAnims
}