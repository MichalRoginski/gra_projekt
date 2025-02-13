import Phaser from "phaser";
import Flyer from "../enemies/Flyer";
import Knight from "../characters/Knight";
import { sceneEvents } from "../events/EventsCenter"
import Magic from "~/enemies/Magic";
const handlePlayerEnemiesCollision = (obj1: Phaser.GameObjects.GameObject, obj2: Phaser.GameObjects.GameObject) =>{
    const flyer = obj1 as Flyer 
    const knight = obj2 as Knight

    const dx = (knight.x+3)-flyer.x;
    const dy = (knight.y+20)-flyer.y;
    
    const dir = new Phaser.Math.Vector2(dx, dy).normalize();
    console.log(knight.health);
    
    knight.handleDamage(dir);
    sceneEvents.emit('player-health-change', knight.health);
}
const handlePlayerShooterCollision = (obj1: Phaser.GameObjects.GameObject, obj2: Phaser.GameObjects.GameObject) =>{
    const flyer = obj2 as Flyer 
    const knight = obj1 as Knight

    const dx = (knight.x+3)-flyer.x;
    const dy = (knight.y+20)-flyer.y;
    
    const dir = new Phaser.Math.Vector2(dx, dy).normalize();
    knight.handleDamage(dir);
    sceneEvents.emit('player-health-change', knight.health);
}
const handlePlayerProjectileCollision = (obj1: Phaser.GameObjects.GameObject, obj2: Phaser.GameObjects.GameObject) =>{
    const projectile = obj2 as Magic
    const knight = obj1 as Knight

    knight.setVelocity(0,0);

    const dx = (knight.x+3)-projectile.x;
    const dy = (knight.y+20)-projectile.y;
    
    obj2.destroy();

    const dir = projectile.getVector()!.normalize();
    knight.handleDamage(dir);
    sceneEvents.emit('player-health-change', knight.health);
}
export {
    handlePlayerEnemiesCollision,
    handlePlayerShooterCollision,
    handlePlayerProjectileCollision
}
