import Phaser from "phaser"
const createSpikeAnims = (anims: Phaser.Animations.AnimationManager) =>{
    anims.create({
        key: "spike_stab",
        frames: anims.generateFrameNames("spike",{ start:1 , end:3, prefix: "floor_spikes_anim_f"}),
        frameRate: 10
    })
    anims.create({
        key: "spike_show",
        frames: anims.generateFrameNames("spike",{ start:1 , end:1, prefix: "floor_spikes_anim_f"}),
        frameRate: 10
    })
    anims.create({
        key: "spike_wait",
        frames: anims.generateFrameNames("spike",{ start:0 , end:0, prefix: "floor_spikes_anim_f"}),
        frameRate: 10
    })
    anims.create({
        key: "spike_retract",
        frames: anims.generateFrameNames("spike",{ start:3 , end:0, prefix: "floor_spikes_anim_f"}),
        frameRate: 10
    })
}
export {
    createSpikeAnims
}