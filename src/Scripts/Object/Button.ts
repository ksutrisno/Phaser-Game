import * as Phaser from 'phaser';
import {Move} from "../Move"
import GameScene from '../Scene/GameScene';



export default class Button extends Phaser.GameObjects.Image
{   
    private m_move:Move;
    private m_scene:GameScene;
    
    constructor(scene:GameScene, x:number, y:number, move:Move)
    {   
        super(scene, x , y, move , 0);

        this.m_scene = scene;

        this.m_move = move;

        scene.add.existing(this);

        this.setInteractive();
        this.on("pointerdown", () => this.isPressed());
        
    }


    isPressed()
    {
        this.m_scene.processMove(this.m_move);
        this.m_scene.validateMove(this.m_move);
    }
  

}