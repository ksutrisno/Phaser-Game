
import * as Phaser from "phaser";
import { Move } from "../Move";


export default class ScorePopUp extends Phaser.GameObjects.Text
{
    constructor(scene:Phaser.Scene, x:number, y:number, text:string, move:Move, duration:number)
    {   
        let color;
        if(move == Move.kUp)
        {
            color = "#ffa500"
        }
        else
        {
            color = "#22A72A"
        }

        super(scene, x, y, text, { color: color, fontSize: '42px' })
        {
            this.scene.add.existing(this);
            this.setOrigin(0.5);
            
        }

        let val = Math.pow(0.1, (0.02/ duration))

        scene.time.addEvent({
            delay: 20, loop :true,
            callback: () => {
                this.y-= 3;
                this.setAlpha(this.alpha * val);
                if(this.alpha < 0.1)
                {
                    this.destroy();
                }
                    
            }
             
          });
      
    }

  
}