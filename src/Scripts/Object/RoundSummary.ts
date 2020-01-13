import * as Phaser from "phaser";
import { animationHelper } from "../Helper/AnimationHelper";

export default class RoundSummary extends Phaser.GameObjects.Container {
  private m_roundText: Phaser.GameObjects.Text;
  private m_pointText: Phaser.GameObjects.Text;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    round: number,
    point: number
  ) {
    let children = [];

    let panel = new Phaser.GameObjects.Rectangle(
      scene,
      0,
      0,
      650,
      500,
      0x2a81bf
    );

    children.push(panel);

    let panelTitle = new Phaser.GameObjects.Rectangle(
      scene,
      0,
      -225,
      300,
      100,
      0x2a81ff
    );
    children.push(panelTitle);

    let titleText = new Phaser.GameObjects.Text(
      scene,
      0,
      -200,
      "ROUND " + round.toString(),
      { color: "white", fontSize: "48px" }
    ).setOrigin(0.5, 1);

    children.push(titleText);

    let youGet = new Phaser.GameObjects.Text(scene, 0, -100, "YOU GET", {
      color: "white",
      fontSize: "30px"
    }).setOrigin(0.5, 1);

    children.push(youGet);

    let coin = new Phaser.GameObjects.Image(scene, 0, 0, "scoreBg");

    coin.setScale(2);

    children.push(coin);

    let points = new Phaser.GameObjects.Text(scene, 0, 150, point.toString(), {
      color: "yellow",
      fontSize: "50px"
    }).setOrigin(0.5, 1);

    children.push(points);

    let pointText = new Phaser.GameObjects.Text(scene, 0, 200, "POINTS", {
      color: "yellow",
      fontSize: "30px"
    }).setOrigin(0.5, 1);

    children.push(pointText);

    super(scene, x, y, children);

    scene.add.existing(this);

    this.m_pointText = points;
    this.m_roundText = titleText;

    this.setDepth(1);
  }

  show(round: number, point: number) {
    this.m_pointText.setText(point.toString());
    this.setScale(this.scale * 0.4);
    this.m_roundText.setText("ROUND " + round.toString());
    this.setVisible(true);
    animationHelper.Resize(this.scene, this, 0.2, 1);
  }

  hide() {
    this.setVisible(false);
  }
}
