import Phaser from "phaser";
import Spike from "../enemies/Spike";
import Knight from "../characters/Knight";
import { sceneEvents } from "../events/EventsCenter"


const handlePlayerSpikeCollision = (obj1: Phaser.GameObjects.GameObject, obj2: Phaser.GameObjects.GameObject) =>{
    const knight = obj1 as Knight
    const spike = obj2 as Spike

    const dx = (knight.x+3)-spike.x;
    const dy = (knight.y+20)-spike.y;

    const dir = new Phaser.Math.Vector2(dx, dy).normalize();

    knight.handleDamage(dir);
    sceneEvents.emit('player-health-change', knight.health);
}
export {
    handlePlayerSpikeCollision
}
