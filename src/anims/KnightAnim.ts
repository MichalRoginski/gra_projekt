import Phaser from "phaser"
const createKnightAnims = (anims: Phaser.Animations.AnimationManager) =>{
    anims.create({
        key: 'knight-idle',
        frames: [{ key: 'knight', frame:'knight_f_idle_anim_f0'}]
    })

    anims.create({
        key: 'knight-run',
        frames: anims.generateFrameNames('knight', { start:0, end:3, prefix:'knight_f_run_anim_f' }),
        repeat: -1,
        frameRate: 15
    })

    anims.create({
        key: 'knight-hit',
        frames: [{ key: 'knight', frame:'knight_m_hit_anim_f0'}]
    })
}
export {
    createKnightAnims
}