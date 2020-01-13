import * as Phaser from "phaser";

export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: "PreloadScene" });
  }

  preload(): void {
    this.load.path = "src/Assets/";
    this.load.image("shopee", "shopee.png");
    this.load.spritesheet("dancer-idle", "choki-standby.png", {
      frameWidth: 450,
      frameHeight: 450
    });
    this.load.spritesheet("dancer-up", "choki-up.png", {
      frameWidth: 450,
      frameHeight: 450
    });
    this.load.spritesheet("dancer-right", "choki-right.png", {
      frameWidth: 450,
      frameHeight: 450
    });

    this.load.spritesheet("dancer-win", "choki-win.png", {
      frameWidth: 450,
      frameHeight: 450
    });

    this.load.spritesheet("dancer-lose", "choki-lose.png", {
      frameWidth: 450,
      frameHeight: 450
    });

    this.load.image("right", "RightButton.png");

    this.load.image("x", "x.png");

    this.load.image("replay", "Replay.png");

    this.load.image("up", "UpButton.png");

    this.load.image("slot", "EmptyButton.png");

    this.load.image("background", "MainBackground.png");

    this.load.image("scoreBg", "Points.png");

    this.load.audio("whistle", "whistle.wav");

    this.load.audio("correct", "correct.wav");

    this.load.audio("wrong", "wrong.wav");

    this.load.audio("disco", "disco.mp3");

    this.load.audio("yay", "yay.wav");
  }

  create(): void {
    this.scene.start("GameScene");
  }
}
