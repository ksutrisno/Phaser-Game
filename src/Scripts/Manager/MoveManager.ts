import * as Phaser from 'phaser';
import {Move} from "../Move"
import GameScene from "../scene/GameScene"

class MoveObject extends Phaser.GameObjects.Image
{
    constructor(scene:GameScene, x:number, y:number, key:string)
    {
        super(scene, x, y, key)
        scene.add.existing(this);
        this.setScale(0.8);
    }
}   

const k_delayBetweenMove = 700;

export default class MoveManager
{   
    private m_scene: GameScene;
    private m_currentIndex : number = 0;   
    private m_currMoveCount: number = 5;
    private m_moves: Move[]  = []

    constructor(scene:GameScene)
    {
        this.m_scene = scene;

        this.createMoveSlots();

        this.generateMoves();
    }

    createMoveSlots()
    {
        for(let i = 0; i < this.m_currMoveCount; i++)
        {
           let width = this.m_scene.cameras.main.width;
           let slot = this.m_scene.add.image((width * 0.9/this.m_currMoveCount) * (i + 1) - (width* 0.05), 725, 'slot');
           slot.setScale(2);
        }
    }

    generateMoves()
    {   
        this.m_moves = [];

        for(let i = 0; i < this.m_currMoveCount; i++)
        {
            this.m_scene.time.addEvent({
                delay: k_delayBetweenMove * (i + 1),
                callback: () => {
                    let rand = Math.round(Math.random());
                    
                    let move:Move;
                    if(rand == 0)
                    {
                        move = Move.kUp;
                        this.m_moves.push(move);
                    }
                    else
                    {
                        move = Move.kRight;
                        this.m_moves.push(move);
                    }

                    let width = this.m_scene.cameras.main.width;
                    new MoveObject(this.m_scene, (width * 0.9/this.m_currMoveCount) * (i + 1) - (width* 0.05), 725, move);
                    this.m_scene.processMove(move);
                }
              });
        }

    }

    validateMove(move:Move)
    {
       
    }

    

    
}
