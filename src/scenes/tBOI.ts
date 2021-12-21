import Phaser from 'phaser'
import {debugDraw} from "../utils/debug"
import Flyer from "../enemies/Flyer"
import {createFlyerAnims} from "../anims/FlyerAnim"
import "../characters/Knight"
import {createKnightAnims} from "../anims/KnightAnim"


export default class tBOI extends Phaser.Scene
{
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys
    private knight!: Phaser.Physics.Arcade.Sprite
    
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
        this.physics.world.setFPS(240);
        console.log("<game>");
        const map = this.make.tilemap({key: 'debug_dungeon'});
        const tileset = map.addTilesetImage('debug_dungeon2', 'tiles');
        const ground = map.createLayer("ground", tileset);
        const walls = map.createLayer("walls", tileset);
        walls.setCollisionByProperty({collides:true});

        walls.setScale(3);
        ground.setScale(3);

        this.cursors.up = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.cursors.down = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.cursors.left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.cursors.right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        createKnightAnims(this.anims);
        this.knight = this.add.knight(128, 128, 'knight');

        this.physics.add.collider(this.knight, walls);

        createFlyerAnims(this.anims);
        

        const flyers = this.physics.add.group({
            classType: Flyer
        })
        
        flyers.get(320,320,"flyer");
        flyers.get(500,320,"flyer");
        flyers.get(320,400,"flyer");
        flyers.children.each(p => {
            const flyer = p as Flyer;
            this.physics.add.collider(p, this.knight, this.handlePlayerEnemiesCollision, undefined, this);
            this.physics.add.collider(p, walls);
            flyers.children.each(x => {
                const secondFlyer = x as Flyer;
                if(x != p){
                    this.physics.add.collider(x, p);
                } 
            })
        })
        flyers.children.each(p => {
            const flyer = p as Flyer;
            flyer.setTarget(this.knight);
        })

        const friendlyProjectiles = this.physics.add.group({
            classType: Phaser.Physics.Arcade.Image
        })
        this.physics.add.collider(friendlyProjectiles, flyers);
        this.physics.add.collider(friendlyProjectiles, walls);

        debugDraw(walls, this); //comment/uncomment for drawing debug        
        console.log("</game>");
    }
    private handlePlayerEnemiesCollision(obj1: Phaser.GameObjects.GameObject, obj2: Phaser.GameObjects.GameObject){
        /*const flyer = obj2 as Flyer 
        
        const dx = this.knight.x - flyer.x;
        const dy = this.knight.y -  flyer.y;

        const dir = new Phaser.Math.Vector2(dx, dy).normalize().scale(200);

        this.knight.setVelocity(dir.x, dir.y);

        this.hit = 1;*/
    }

    update(t: number, dt: number) {
        if(this.knight){
            this.knight.update(this.cursors);
        }
    }
}
