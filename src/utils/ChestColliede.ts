import Phaser from "phaser";
import Chest from "../item/Chest";
import Knight from "../characters/Knight";

const handlePlayerChestCollision = (obj1: Phaser.GameObjects.GameObject, obj2: Phaser.GameObjects.GameObject) =>{
    const knight = obj1 as Knight
    const chest = obj2 as Chest
    knight.setChest(chest);
}
export {
    handlePlayerChestCollision
}
