import * as Phaser from "phaser";

class AnimationHelper {
  private static m_instance: AnimationHelper;

  constructor() {

  }

  public static get Instance() {
    return this.m_instance || (this.m_instance = new this());
  }

  public Pulse(
    scene: Phaser.Scene,
    object: Phaser.GameObjects.GameObject,
    duration: number,
    scale: number,
    repeatTime: number = 0
  ) {
    let tween = scene.tweens.add({
      targets: object,
      scale: scale,
      ease: "Linear",
      duration: duration * 1000,
      yoyo: true,
      repeat: repeatTime
    });
  }

  public Resize(
    scene: Phaser.Scene,
    object: Phaser.GameObjects.GameObject,
    duration: number,
    scale: number
  ) {
    let tween = scene.tweens.add({
      targets: object,
      scale: scale,
      ease: "Linear",
      duration: duration * 1000,
      yoyo: false,
      repeat: 0
    });
  }

  public Swing(
    scene: Phaser.Scene,
    object: Phaser.GameObjects.GameObject,
    duration: number,
    degree: number,
    repeatTime: number
  ) {
    scene.tweens.add({
      targets: object,
      angle: degree,
      ease: "Linear",
      duration: (duration / 2) * 1000,
      yoyo: true,
      repeat: 0,
      onComplete: () => {
        this.Swing(scene, object, duration, -degree, repeatTime);
      }
    });
  }

  public ChangeAlpha(
    scene: Phaser.Scene,
    object: Phaser.GameObjects.GameObject,
    duration: number,
    alpha: number
  ) {
    {
      let tween = scene.tweens.add({
        targets: object,
        alpha: alpha,
        ease: "Linear",
        duration: duration * 1000,
        yoyo: false,
        repeat: 0
      });
    }
  }

  public MoveToTarget(
    scene: Phaser.Scene,
    object: Phaser.GameObjects.GameObject,
    duration: number,
    target: Phaser.Geom.Point,
  ) {
    {
      let tween = scene.tweens.add({
        targets: object,
        x: target.x,
        y: target.y,
        ease: "Linear",
        duration: duration * 1000,
        yoyo: false,
        repeat: 0
      });
    }
  }
}

export const animationHelper = AnimationHelper.Instance;
