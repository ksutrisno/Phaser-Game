
import * as Phaser from "phaser";

export default class Timer
{   
    private m_duration:number;

    private m_currentTime:number;
    
    private m_timer:Phaser.Time.TimerEvent;

    private m_text;

    private m_hasStarted:boolean = false;

    constructor(scene:Phaser.Scene, duration:number = 20.001)
    {   
        this.m_duration = duration;
        this.m_currentTime = duration;
        this.m_text = scene.add.text(scene.cameras.main.width/2, 200,duration.toString().substr(0,5) , {fontSize: 50} ).setOrigin(0.5);
    }
    
    playTimer(scene:Phaser.Scene)
    {
        if(this.m_timer === undefined)
        {
            this.m_timer = scene.time.delayedCall(this.m_duration * 1000, this.timeOut, [], scene);
        }
      
        this.m_hasStarted = true;
    }

    timeOut()
    {
        console.log("timeout");
    }

    pause(pause:boolean)
    {
        this.m_timer.paused = pause;
    }

    tick()
    {   
        if(this.m_hasStarted)
        {
            let time = this.m_duration  - (this.m_timer.getProgress() * this.m_duration);
            this.m_text.setText(time.toString().substr(0, 5));
        }
       
    }

    reset()
    {   
        this.m_text.setText(this.m_duration.toString().substr(0, 5));
        this.m_hasStarted = false;

        if(this.m_timer !== undefined)
        {
            this.m_timer.destroy();
            this.m_timer = undefined;
        }
    }
}