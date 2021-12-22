import Phaser from "phaser";

export default class Preloader extends Phaser.Scene{
    constructor(){
        super('Preloader');
    }
    preload(){
        this.load.image('tiles', 'tiles/ground_walls.png');
        this.load.tilemapTiledJSON('debug_dungeon','tiles/debug_dungeon.json');
        
        this.load.atlas('knight', 'character/knight.png', 'character/knight_atlas.json');

        this.load.atlas("flyer","enemies/flyer_run.png","enemies/flyer_run_atlas.json");

        this.load.image("arrow", "weapons/weapon_arrow.png");

        this.load.image("ui-heart-empty", 'ui/ui_heart_empty.png');
        this.load.image("ui-heart-full", 'ui/ui_heart_full.png');
        this.load.image("ui-heart-half", 'ui/ui_heart_half.png');

    }
    create(){
        console.log("<preload>");
        this.scene.start('tBOI');
        console.log("</preload>");
    }
}