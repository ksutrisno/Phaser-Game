
import * as Phaser from "phaser";
import { Move } from "../Move";


export default class GameScore extends Phaser.GameObjects.Image
{
    private m_text : Phaser.GameObjects.Text;
    private m_score:number = 0;
    constructor(scene:Phaser.Scene, x:number, y:number)
    {   
        super(scene, x, y, "scoreBg")
        {
            this.scene.add.existing(this);
            this.m_text = scene.add.text(x + 50, y, "0", {fontSize: 40, color:"white"});
            this.m_text.setOrigin(0, 0.5);
        }
    }

    reset()
    {
        this.m_score = 0;
        this.m_text.setText(this.m_score.toString());
    }

    addScore(score:number)
    {
        for(let i = 0; i < score/100; i++)
        {
            this.scene.time.addEvent({
                delay: 200 * i,
                callback: () => {
                    this.m_score += 100;
                    this.m_text.setText(this.m_score.toString());
                }     
              });
        }
    
    }

  
}