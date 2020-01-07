import * as Phaser from "phaser";
import { Move } from "../Move";

export default class Dancer extends Phaser.GameObjects.Sprite {
  private m_upAnim: Phaser.Animations.Animation | boolean;
  private m_idleAnim: Phaser.Animations.Animation | boolean;
  private m_rightAnim: Phaser.Animations.Animation | boolean;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y - 150, "dancer-idle", 0);

    this.setScale(0.7);
    let idleAnim = scene.anims.create({
      key: "idle",
      frames: scene.anims.generateFrameNumbers("dancer-idle", {
        start: 0,
        end: 2
      }),
      frameRate: 6,
      yoyo: false,
      repeat: -1
    });

    let upAnim = scene.anims.create({
      key: "up",
      frames: scene.anims.generateFrameNumbers("dancer-up", {
        start: 0,
        end: 7
      }),
      frameRate: 12,
      yoyo: false,
      repeat: 0,
    });

    let rightAnim = scene.anims.create({
      key: "right",
      frames: scene.anims.generateFrameNumbers("dancer-right", {
        start: 0,
        end: 7
      }),
      frameRate: 12,
      yoyo: false,
      repeat: 0,
    });

    scene.add.existing(this);

    this.anims.load("idle");
    this.anims.load("up");
    this.anims.load("right");

    this.dance(Move.kIdle);


  }

  public dance(move: Move): void {
   
    this.anims.play(move);

    this.anims.chain('idle');
  }
}
