import * as Phaser from "phaser";
import GameScene from "../Scene/GameScene";

export default class CountDown
{
    private m_countDownText:string[] = ["Ready", "Set", "Go"]
    private m_text:Phaser.GameObjects.Text;
    private m_scene:Phaser.Scene;
    private m_whistleSound:Phaser.Sound.BaseSound;

    constructor(scene:Phaser.Scene, x:number, y:number, countDownText:string[] = [])
    {
        this.m_scene = scene;

        if(countDownText.length !== 0)
        {   
            this.m_countDownText = countDownText;
        }

        this.m_text = scene.add.text(x, y, this.m_countDownText[0], {fontSize: 68, color: "white" } ).setOrigin(0.5);
        this.m_whistleSound = scene.sound.add('whistle');  
    }

    //** startCountDown require a function as paramater to call when the countdouwn is complete,
    //** it also accepts delay between countdown in seconds
    startCountDown(callbackFunction:()=>void, delay:number = 1) : void
    {
        let index = 0;
        this.m_text.setVisible(true);
        for(let i = 0; i < this.m_countDownText.length + 1; i++)
       {
        this.m_scene.time.addEvent({
            delay: delay * 1000 * i,
            callback: () => {
                this.m_text.setText(this.m_countDownText[i]);

                if(index === this.m_countDownText.length)
                {   
                    this.m_text.setVisible(false);
                    callbackFunction();
                }
                else
                {  
                    this.m_whistleSound.play();
                }
                index++;
            }
          });

      }
   
    }

}