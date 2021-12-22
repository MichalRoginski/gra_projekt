import Phaser from "phaser";
import Flyer from "../enemies/Flyer";
import Knight from "../characters/Knight";
import { sceneEvents } from "../events/EventsCenter"
const handlePlayerEnemiesCollision = (obj1: Phaser.GameObjects.GameObject, obj2: Phaser.GameObjects.GameObject) =>{
    const flyer = obj1 as Flyer 
    const knight = obj2 as Knight

    const dx = (knight.x+3)-flyer.x;
    const dy = (knight.y+20)-flyer.y;
    
    const dir = new Phaser.Math.Vector2(dx, dy).normalize();

    knight.handleDamage(dir);
    sceneEvents.emit('player-health-change', knight.health);
}
export {
    handlePlayerEnemiesCollision
}
