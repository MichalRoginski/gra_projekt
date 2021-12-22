import Phaser, { Game, Physics } from 'phaser'
import {debugDraw} from "../utils/debug"
import Flyer from "../enemies/Flyer"
import {createFlyerAnims} from "../anims/FlyerAnim"
import {createKnightAnims} from "../anims/KnightAnim"
import "../characters/Knight"
import Knight from '../characters/Knight'
import {ArrowEnemyCollisionHandler, ArrowShooterCollisionHandler, ArrowWallCollisionHandler} from "../utils/ArrowCollided"
import { sceneEvents } from '../events/EventsCenter'
import Arrow from '../characters/Arrow'
import { createSpikeAnims } from '../anims/SpikeAnim'
import Spike from '../enemies/Spike'
import { handlePlayerEnemiesCollision, handlePlayerShooterCollision, handlePlayerProjectileCollision } from '../utils/EnemiesCollided'
import { handlePlayerSpikeCollision } from '../utils/SpikesCollided'
import Shooter from '../enemies/Shooter'
import { createShooterAnims } from '../anims/ShooterAnim'
import Magic from '~/enemies/Magic'

export default class tBOI_2 extends Phaser.Scene
{
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys
    private knight!: Knight
    private flyers!: Phaser.Physics.Arcade.Group
    private shooters!: Phaser.Physics.Arcade.Group
    private borders!: Phaser.Physics.Arcade.Group
    private open = false;
    private exits!: Phaser.Physics.Arcade.Group
    private gameOver = false;
    
	constructor()
	{
		super('tBOI_2');
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
        const map = this.make.tilemap({key: 'dungeon_0'});
        const tileset = map.addTilesetImage('ground_walls', 'tiles');
        const ground = map.createLayer("ground", tileset);
        const border = this.add.layer();
        const traps = this.add.layer();
        const enemies = this.add.layer();
        const player = this.add.layer(this.knight);
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
        
        this.borders = this.physics.add.group();
        this.exits = this.physics.add.group();

        const border1 = this.physics.add.sprite(24,360,"spike","floor_spikes_anim_f3");
        border1.setScale(3);
        this.physics.add.collider(this.knight, border1, handlePlayerSpikeCollision);
        border1.setImmovable();
        border.add(border1);
        this.borders.add(border1);

        const border2 = this.physics.add.sprite(24,408,"spike","floor_spikes_anim_f3");
        border2.setScale(3);
        this.physics.add.collider(this.knight, border2, handlePlayerSpikeCollision);
        border2.setImmovable();
        border.add(border2);
        this.borders.add(border2);

        const border3 = this.physics.add.sprite(552,24,"spike","floor_spikes_anim_f3");
        border3.setScale(3);
        this.physics.add.collider(this.knight, border3, handlePlayerSpikeCollision);
        border3.setImmovable();
        border.add(border3);
        this.borders.add(border3);


        const border4 = this.physics.add.sprite(600,24,"spike","floor_spikes_anim_f3");
        border4.setScale(3);
        this.physics.add.collider(this.knight, border4, handlePlayerSpikeCollision);
        border4.setImmovable();
        border.add(border4);
        this.borders.add(border4);

        const border5 = this.physics.add.sprite(648,24,"spike","floor_spikes_anim_f3");
        border5.setScale(3);
        this.physics.add.collider(this.knight, border5, handlePlayerSpikeCollision);
        border5.setImmovable();
        border.add(border5);
        this.borders.add(border5);

        const border6 = this.physics.add.sprite(1176,360,"spike","floor_spikes_anim_f3");
        border6.setScale(3);
        this.physics.add.collider(this.knight, border6, handlePlayerSpikeCollision);
        border6.setImmovable();
        border.add(border6);
        this.borders.add(border6);

        const border7 = this.physics.add.sprite(1176,408,"spike","floor_spikes_anim_f3");
        border7.setScale(3);
        this.physics.add.collider(this.knight, border7, handlePlayerSpikeCollision);
        border7.setImmovable();
        border.add(border7);
        this.borders.add(border7);

        const border8 = this.physics.add.sprite(552,696,"spike","floor_spikes_anim_f3");
        border8.setScale(3);
        this.physics.add.collider(this.knight, border8, handlePlayerSpikeCollision);
        border8.setImmovable();
        border.add(border8);
        this.borders.add(border8);

        const border9 = this.physics.add.sprite(600,696,"spike","floor_spikes_anim_f3");
        border9.setScale(3);
        this.physics.add.collider(this.knight, border9, handlePlayerSpikeCollision);
        border9.setImmovable();
        border.add(border9);
        this.borders.add(border9);

        const border10 = this.physics.add.sprite(648,696,"spike","floor_spikes_anim_f3");
        border10.setScale(3);
        this.physics.add.collider(this.knight, border10, handlePlayerSpikeCollision);
        border10.setImmovable();
        border.add(border10);
        this.borders.add(border10);

        

        createSpikeAnims(this.anims);
        const spikes = this.physics.add.group({
            classType: Spike
        })
        //const test = spikes.get(600,600,"spike");
        this.physics.add.collider(spikes, this.knight, handlePlayerSpikeCollision);

        createShooterAnims(this.anims);
        this.shooters = this.physics.add.group({
            classType: Shooter
        })
        //this.shooters.get(500,500,"shooter");
        const enemyProjectiles = this.physics.add.group({
            classType: Magic
        })
        this.physics.add.collider(enemyProjectiles , this.knight, handlePlayerProjectileCollision);

        this.physics.add.collider(walls , enemyProjectiles, ArrowWallCollisionHandler);
        this.physics.add.collider(this.shooters , this.knight, handlePlayerShooterCollision);
        this.shooters.children.each(p => {
            const shooter = p as Shooter;
            shooter.setTarget(this.knight, enemyProjectiles);
        })

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
        this.physics.add.collider(friendlyProjectiles, this.shooters, ArrowShooterCollisionHandler);

        this.knight.setFriendlyProjectiles(friendlyProjectiles);

        spikes.children.each(p => {
            const spike = p as Flyer;
            traps.add(spike);
        })
        

        this.flyers.children.each(p => {
            const flyer = p as Flyer;
            enemies.add(flyer);
        })

        debugDraw(walls, this); //comment/uncomment for drawing debug        
        console.log("</game>");

    }

    update(t: number, dt: number) {
        if(this.knight){
            this.knight.update(this.cursors, this);
        }
        if(this.open==false&&this.shooters.getLength()<=0&&this.flyers.getLength()<=0){
            this.borders.children.each(p => {
                const border = p as Phaser.Physics.Arcade.Sprite;
                let teleport;
                if(border.x<100){
                    border.x-=46;
                    teleport = "tBOI";
                } else if(border.x>1000){
                    border.x+=46;
                    teleport = "tBOI_4";
                } else if(border.y<100){
                    border.y-=46;
                    teleport = "tBOI_3";
                } else{ border.y+=46;
                    teleport = "tBOI_5";
                }
                const exit = this.physics.add.sprite(border.x,border.y,"spike","floor_spikes_anim_f3");
                exit.setScale(3);
                this.physics.add.collider(this.knight, exit,() => {
                    console.log("test");
                    this.scene.start(teleport);
                });
                exit.setImmovable();
                this.exits.add(exit);
                border.destroy();
            })
            this.open = true;
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
