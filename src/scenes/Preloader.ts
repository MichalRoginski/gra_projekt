import Phaser from "phaser";

export default class Preloader extends Phaser.Scene{
    constructor(){
        super('Preloader');
    }
    preload(){
        this.load.image('tiles', 'tiles/ground_walls.png');
        this.load.tilemapTiledJSON('debug_dungeon','tiles/debug_dungeon.json');
        this.load.tilemapTiledJSON('dungeon_0','tiles/dungeon_0.json');
        this.load.tilemapTiledJSON('dungeon_3','tiles/dungeon_3.json');
        this.load.tilemapTiledJSON('dungeon_4','tiles/dungeon_4.json');
        this.load.tilemapTiledJSON('dungeon_5','tiles/dungeon_5.json');
        this.load.tilemapTiledJSON('dungeon_1','tiles/dungeon_1.json');
        
        this.load.atlas('knight', 'character/knight.png', 'character/knight_atlas.json');

        this.load.atlas("flyer","enemies/flyer_run.png","enemies/flyer_run_atlas.json");
        this.load.atlas("flyer_ded","enemies/flyer_dead.png","enemies/flyer_dead_atlas.json");
        this.load.atlas("spike", "enemies/spike.png","enemies/spike_atlas.json")
        this.load.atlas("shooter_idle","enemies/shooter_idle.png","enemies/shooter_idle_atlas.json");
        this.load.atlas("shooter_shoot","enemies/shooter_shoot.png","enemies/shooter_shoot_atlas.json");
        this.load.atlas("shooter_dead","enemies/shooter_dead.png","enemies/shooter_dead_atlas.json");
        this.load.atlas("chest_open", "ui/chest_open.png", "ui/chest_open_atlas.json");

        this.load.image("magic","weapons/Magic_Attack1.png");
        this.load.image("arrow", "weapons/weapon_arrow.png");

        this.load.image("ui-heart-empty", 'ui/ui_heart_empty.png');
        this.load.image("ui-heart-full", 'ui/ui_heart_full.png');
        this.load.image("ui-heart-half", 'ui/ui_heart_half.png');

    }
    create(){
        console.log("<preload>");
        this.scene.start('tBOI_2',{x:600, y:384});
        console.log("</preload>");
    }
}