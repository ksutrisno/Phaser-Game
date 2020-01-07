import * as Phaser from "phaser";
import Dancer from "../Object/Dancer"
import Button from "../Object/Button"
import FpsText from "../Object/FpsText";
import MoveManager from "../Manager/MoveManager"
import {Move} from "../Move";

export default class GameScene extends Phaser.Scene {

  private fpsText:FpsText;

  private m_moveManager:MoveManager;

  private m_dancer:Dancer;

  constructor() {
    super({ key: "GameScene" });
  }

  preload(): void 
  {
     
  }

  create(): void 
  {
      this.fpsText = new FpsText(this);

      this.m_dancer = new Dancer(this, this.cameras.main.width/2, this.cameras.main.height/2);
      new Button(this, this.cameras.main.width/2 - 180, this.cameras.main.height/2 + 350, Move.kUp);
      new Button(this, this.cameras.main.width/2 + 180, this.cameras.main.height/2 + 350, Move.kRight);

      this.m_moveManager = new MoveManager(this);
  }

  update(): void 
  {
    this.fpsText.update();
  }

  validateMove(move:Move):void
  {
    this.m_moveManager.validateMove(move);
  }

  processMove(move:Move): void
  {
    this.m_dancer.dance(move);
  }

  

}
