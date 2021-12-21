import Phaser from "phaser";
import Arrow from "~/characters/Arrow";
import Flyer from "~/enemies/Flyer";
const ArrowWallCollisionHandler = (obj1: Phaser.GameObjects.GameObject, obj2: Phaser.GameObjects.GameObject) =>{
    obj1.destroy();
}
const ArrowEnemyCollisionHandler = (obj1: Phaser.GameObjects.GameObject, obj2: Phaser.GameObjects.GameObject) =>{
    obj1.destroy();
    const enemy = obj2 as Flyer;
    const projectile = obj1 as Arrow;
    enemy.hit(50);
}
export {
    ArrowWallCollisionHandler,
    ArrowEnemyCollisionHandler
}