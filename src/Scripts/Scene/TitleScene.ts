import * as Phaser from "phaser";
import FpsText from "../Component/FpsText";
import AlignTool from "../Util/AlignTool";
import Header from "../Component/Header";

export default class TitleScene extends Phaser.Scene {
  private fpsText: FpsText;

  constructor() {
    super({ key: "TitleScene" });
  }

  preload(): void {}

  create(): void {
    let bg = this.add.tileSprite(
      this.cameras.main.width / 2,
      this.cameras.main.height / 2,
      this.cameras.main.width,
      this.cameras.main.height,
      "bg"
    );

    let header = new Header(this);

    let logo = this.add.image(
      this.cameras.main.width / 2,
      this.cameras.main.height * 0.65,
      "logo"
    );

    AlignTool.scaleToScreenWidth(this, logo, 0.7);

 
    let element = this.add.dom(
      this.cameras.main.width/2,
      this.cameras.main.height * 0.3
    ).createFromCache('nameform')
    

  }

  update(): void {}
}
