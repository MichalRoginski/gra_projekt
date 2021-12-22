import Phaser, { Game, Physics } from 'phaser'
import {debugDraw} from "../utils/debug"
import Flyer from "../enemies/Flyer"
import {createFlyerAnims} from "../anims/FlyerAnim"
import {createKnightAnims} from "../anims/KnightAnim"
import "../characters/Knight"
import Knight from '../characters/Knight'
import {ArrowEnemyCollisionHandler, ArrowWallCollisionHandler} from "../utils/ArrowCollided"
import { sceneEvents } from '../events/EventsCenter'
import Arrow from '../characters/Arrow'
import { createSpikeAnims } from '../anims/SpikeAnim'
import Spike from '../enemies/Spike'
import { handlePlayerEnemiesCollision } from '../utils/EnemiesCollided'
import { handlePlayerSpikeCollision } from '../utils/SpikesCollided'

export default class tBOI extends Phaser.Scene
{
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys
    private knight!: Knight
    private flyers!: Phaser.Physics.Arcade.Group
    private gameOver = false;
    
	constructor()
	{
		super('tBOI');
	}

	preload()
    {
        this.cursors = this.input.keyboard.createCursorKeys()

    }

    create()
    {
        this.scene.run('game-ui');
        this.physics.world.setFPS(240);
        console.log("<game>");
        const map = this.make.tilemap({key: 'debug_dungeon'});
        const tileset = map.addTilesetImage('debug_dungeon2', 'tiles');
        const ground = map.createLayer("ground", tileset);
        const traps = this.add.layer();
        const enemies = this.add.layer();
        const backwalls = map.createLayer("backwalls", tileset);
        const walls = map.createLayer("walls", tileset);
        walls.setCollisionByProperty({collides:true});

        walls.setScale(3);
        backwalls.setScale(3);
        ground.setScale(3);

        this.cursors.up = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        this.cursors.down = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        this.cursors.left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        this.cursors.right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        createKnightAnims(this.anims);
        this.knight = this.add.knight(128, 128, 'knight');

        this.physics.add.collider(this.knight, walls);


        

        createSpikeAnims(this.anims);
        const spikes = this.physics.add.group({
            classType: Spike
        })
        const test = spikes.get(600,600,"spike");
        this.physics.add.collider(spikes, this.knight, handlePlayerSpikeCollision);


        createFlyerAnims(this.anims);
        this.flyers = this.physics.add.group({
            classType: Flyer
        })
        this.flyers.get(320,320,"flyer");
        this.flyers.get(500,320,"flyer");
        this.flyers.get(320,400,"flyer");
        this.flyers.children.each(p => {
            const flyer = p as Flyer;
            this.physics.add.collider(p, this.knight, handlePlayerEnemiesCollision);
            this.physics.add.collider(p, walls);
            this.flyers.children.each(x => {
                const secondFlyer = x as Flyer;
                if(x != p){
                    this.physics.add.collider(secondFlyer, flyer);
                } 
            })
        })
        
        this.flyers.children.each(p => {
            const flyer = p as Flyer;
            flyer.setTarget(this.knight);
        })

        const friendlyProjectiles = this.physics.add.group({
            classType: Arrow
        })
        this.physics.add.collider(friendlyProjectiles, this.flyers, ArrowEnemyCollisionHandler);
        this.physics.add.collider(friendlyProjectiles, walls, ArrowWallCollisionHandler);
        this.knight.setFriendlyProjectiles(friendlyProjectiles);

        spikes.children.each(p => {
            const spike = p as Flyer;
            traps.add(spike);
        })

        enemies.add(this.knight);
        this.flyers.children.each(p => {
            const flyer = p as Flyer;
            enemies.add(flyer);
        })

        //debugDraw(walls, this); //comment/uncomment for drawing debug        
        console.log("</game>");

    }

    update(t: number, dt: number) {
        if(this.knight){
            this.knight.update(this.cursors, this);
        }
        if(this.knight.health == 0){
            this.flyers.children.each(p => {
                const flyer = p as Flyer;
                flyer.removeTarget();
            })
            this.knight.body.enable = false;
            this.knight.anims.play("knight-idle");
            if(!this.gameOver){
                this.tweens.add({
                    targets: this.knight,
                    //alpha: 0,
                    angle: -90,
                    x: this.knight.x-50,
                    y: this.knight.y+50,
                    duration: 1000
                });
                this.gameOver = true;
            }
        }
    }
}
