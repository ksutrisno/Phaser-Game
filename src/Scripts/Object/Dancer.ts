import * as Phaser from "phaser";
import { Move } from "../Move";

export default class Dancer extends Phaser.GameObjects.Sprite {

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y - 120, "dancer-idle", 0);

    this.setScale(0.65);
    scene.anims.create({
      key: "idle",
      frames: scene.anims.generateFrameNumbers("dancer-idle", {
        start: 0,
        end: 2
      }),
      frameRate: 6,
      yoyo: false,
      repeat: -1
    });

    scene.anims.create({
      key: "up",
      frames: scene.anims.generateFrameNumbers("dancer-up", {
        start: 0,
        end: 7
      }),
      frameRate: 12,
      yoyo: false,
      repeat: 0,
    });

     scene.anims.create({
      key: "right",
      frames: scene.anims.generateFrameNumbers("dancer-right", {
        start: 0,
        end: 7
      }),
      frameRate: 12,
      yoyo: false,
      repeat: 0,
    });


    scene.anims.create({
        key: "lose",
        frames: scene.anims.generateFrameNumbers("dancer-lose", {
          start: 0,
          end: 7
        }),
        frameRate: 10,
        yoyo: false,
        repeat: 0,
      });

      
    scene.anims.create({
        key: "win",
        frames: scene.anims.generateFrameNumbers("dancer-win", {
          start: 0,
          end: 7
        }),
        frameRate: 12,
        yoyo: false,
        repeat: 1,
      });

         
    scene.anims.create({
        key: "sulk",
        frames: scene.anims.generateFrameNumbers("dancer-lose", {
          start: 6,
          end: 1
        }),
        frameRate: 8,
        yoyo: false,
        repeat: -1,
      });
     

    scene.add.existing(this);

    this.anims.load("idle");
    this.anims.load("up");
    this.anims.load("right");
    this.anims.load("lose");
    this.anims.load("win");
    this.anims.load("sulk");

    this.dance(Move.kIdle);


  }

  public dance(move: Move, chainToIdle:boolean = true): void {
   
    this.anims.play(move);

    if(chainToIdle)
        this.anims.chain('idle');
  }

  public lose()
  {
    this.anims.play("lose");

    this.anims.chain("sulk");
  }
}
