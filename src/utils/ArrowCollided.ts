import Phaser from "phaser";
import Arrow from "~/characters/Arrow";
import Flyer from "~/enemies/Flyer";
import Shooter from "~/enemies/Shooter";
const ArrowWallCollisionHandler = (obj1: Phaser.GameObjects.GameObject, obj2: Phaser.GameObjects.GameObject) =>{
    obj1.destroy();
}
const ArrowEnemyCollisionHandler = (obj1: Phaser.GameObjects.GameObject, obj2: Phaser.GameObjects.GameObject) =>{
    const enemy = obj2 as Flyer;
    const projectile = obj1 as Arrow;
    enemy.hit(projectile.getDamage());
    obj1.destroy();
}
const ArrowShooterCollisionHandler = (obj1: Phaser.GameObjects.GameObject, obj2: Phaser.GameObjects.GameObject) =>{
    const enemy = obj2 as Shooter;
    const projectile = obj1 as Arrow;
    enemy.hit(projectile.getDamage());
    obj1.destroy();
}
export {
    ArrowWallCollisionHandler,
    ArrowEnemyCollisionHandler,
    ArrowShooterCollisionHandler
}