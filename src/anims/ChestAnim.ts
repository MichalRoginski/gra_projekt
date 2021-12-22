import Phaser from "phaser"
const createChestAnims = (anims: Phaser.Animations.AnimationManager) =>{
    anims.create({
        key: "chest_open",
        frames: anims.generateFrameNames("chest_open",{ start:0 , end:2, prefix: "chest_full_open_anim_f"}),
        repeat: -1,
        frameRate: 15
    }),
    anims.create({
        key: "chest_closed",
        frames: anims.generateFrameNames("chest_closed",{ start:0 , end:0, prefix: "chest_full_open_anim_f"}),
        repeat: -1,
        frameRate: 15
    })
}
export {
    createChestAnims
}