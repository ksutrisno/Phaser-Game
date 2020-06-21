import * as Phaser from "phaser";

export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: "PreloadScene" });
  }

  preload(): void {
    this.loadImageAssets();
    this.loadWebComponent();
  }

  loadImageAssets() {
    this.load.path = "src/Assets/image/";
    this.load.spritesheet("bg", "bg_pattern.png", {
      frameWidth: 510,
      frameHeight: 510,
    });

    this.load.spritesheet("header", "header_pattern.png", {
      frameWidth: 512,
      frameHeight: 512,
    });

    this.load.image("logo", "logo.png");
  }

  loadWebComponent() {
    this.load.path = "src/Scripts/WebComponent/";
   this.load.html("nameform", "TextBox.html");
  }

  create(): void {
    this.scene.start("TitleScene");
  }
}
