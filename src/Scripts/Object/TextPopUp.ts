import * as Phaser from "phaser";


export default class TextPopUp extends Phaser.GameObjects.Text {
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    text: string,
    duration: number
  ) {
    super(scene, x, y, text, { color: "white", fontSize: "68px" });
    {
      this.scene.add.existing(this);
      this.setOrigin(0.5);
    }

    scene.time.addEvent({
      delay: duration * 1000,
      callback: () => {
        this.destroy();
      }
    });
  }
}
