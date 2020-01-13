import * as Phaser from "phaser";
import Dancer from "../Object/Dancer";
import Button from "../Object/Button";
import CountDown from "../Object/CountDown";
import FpsText from "../Object/FpsText";
import MoveManager from "../Manager/MoveManager";
import TextPopUp from "../Object/TextPopUp";
import GameScore from "../Object/GameScore";
import { Move } from "../Move";
import Timer from "../Object/Timer";
import RoundSummary from "../Object/RoundSummary";
import GameOver from "../Object/GameOver";
import {animationHelper} from "../Helper/AnimationHelper";

export default class GameScene extends Phaser.Scene {
  private fpsText: FpsText;
  //Manager
  private m_moveManager: MoveManager;

  //Object
  private m_dancer: Dancer;
  private m_currentRound: number = 1;
  private m_upButton: Button;
  private m_rightButton: Button;
  private m_countDown: CountDown;
  private m_scoreUI: GameScore;
  private m_roundSummary: RoundSummary;
  private m_timer: Timer;
  private m_score: number = 0;
  private m_tint:Phaser.GameObjects.Rectangle;
  private m_bgm: Phaser.Sound.BaseSound;
  private m_winSound: Phaser.Sound.BaseSound;
  private m_gameOverUI: GameOver;

  constructor() {
    super({ key: "GameScene" });
  }

  preload(): void {}

  create(): void {
    let bg = this.add.image(
      this.cameras.main.width / 2,
      this.cameras.main.height / 2,
      "background"
    );
    bg.displayWidth = this.cameras.main.width;
    bg.displayHeight = this.cameras.main.height;

    // this.fpsText = new FpsText(this);

    this.m_dancer = new Dancer(
      this,
      this.cameras.main.width / 2,
      this.cameras.main.height / 2
    );
    this.m_upButton = new Button(
      this,
      this.cameras.main.width / 2 - 180,
      this.cameras.main.height / 2 + 350,
      Move.kUp
    );
    this.m_rightButton = new Button(
      this,
      this.cameras.main.width / 2 + 180,
      this.cameras.main.height / 2 + 350,
      Move.kRight
    );

    this.m_moveManager = new MoveManager(this);

    this.m_countDown = new CountDown(this, this.cameras.main.width / 2, 725);

    this.m_scoreUI = new GameScore(this, 75, 75);

    this.m_roundSummary = new RoundSummary(
      this,
      this.cameras.main.width / 2,
      this.cameras.main.height / 2 - 50,
      this.m_currentRound,
      this.m_score
    );
    this.m_roundSummary.hide();
    this.startCountDownPhase();

    this.m_timer = new Timer(this, 20.001);

    this.m_tint = this.add.rectangle(0, 0, this.cameras.main.width, this.cameras.main.height, 0x00000, 0.3);

    this.m_tint.setOrigin(0, 0);

    this.m_tint.setVisible(false);

    let config =
    {
        mute: false,
        volume: 1,
        rate: 1,
        detune: 0,
        seek: 0,
        loop: true,
        delay: 0
    }
   
    this.m_bgm = this.sound.add("disco", config);
    this.m_winSound = this.sound.add("yay");

    this.m_bgm.play();

    this.m_gameOverUI = new GameOver(this);

    this.m_gameOverUI.setVisible(false);
    
  }

  update(): void {
    // this.fpsText.update();
    this.m_timer.tick();
  }

  reset = ()=>
  {
      this.m_moveManager.reset();
      this.m_currentRound = 1;
      this.m_score = 0;
      this.m_scoreUI.reset();
      this.startCountDownPhase();
      this.processMove(Move.kIdle);
      this.m_timer.reset();

      console.log("test");

  }

  roundComplete() {
    this.enableButton(false);

    this.m_timer.pause(true);
    this.time.addEvent({
      delay: 250,
      callback: () => {
        this.processMove(Move.kWin);
        let text = new TextPopUp(this, this.cameras.main.width / 2, 640, "AWESOME", 1.5);
        animationHelper.Pulse(this, text, 0.4, text.scale * 1.3, 3);

        this.m_winSound.play();
      }
    });

    this.m_score += this.m_moveManager.currMoveCount * 100;
    this.time.addEvent({
      delay: 1500,
      callback: () => {
        this.m_scoreUI.addScore(this.m_moveManager.currMoveCount * 100);
        this.m_roundSummary.show(this.m_currentRound, this.m_moveManager.currMoveCount * 100 );
        this.m_tint.setVisible(true);
      }
    });

    this.time.addEvent({
      delay: 3500,
      callback: () => {
        if(this.m_currentRound % 3 === 0)
        {
            this.m_moveManager.currMoveCount++;
            this.m_moveManager.createMoveSlots();
        }
        this.m_moveManager.showMoveSlots(false);
        this.m_moveManager.generateMoves();
        this.m_roundSummary.hide();
        this.startMemorizePhase();
        this.m_tint.setVisible(false);
        this.m_timer.reset();
        this.m_currentRound++;    
      }
    });
  }

  //This get called when player input wrong move
  wrongMove() {
    this.enableButton(false);

    this.time.addEvent({
      delay: 200,
      callback: () => {
        new TextPopUp(this, this.cameras.main.width / 2, 640, "TRY AGAIN", 1);
      }
    });

    this.time.addEvent({
      delay: 1000,
      callback: () => {
        this.startInputPhase();
      }
    });
  }

  //This method start the countdown phase
  startCountDownPhase() {
    this.enableButton(false);
    this.m_moveManager.showMoveSlots(false);
    this.m_moveManager.generateMoves();
    this.m_roundSummary.hide();
    this.time.addEvent({
      delay: 500,
      callback: () => {
        this.m_countDown.startCountDown(this.startMemorizePhase);
      }
    });
  }

  //This method start the memorizing phase
  startMemorizePhase = (): void => {
    this.m_moveManager.showMoveSlots(true);
    this.m_moveManager.displayMoves();
  };

  //This method start the input phase
  startInputPhase() {
    this.enableButton(true);

    this.m_timer.playTimer(this, this.gameOver);
  }

  private enableButton(enable: boolean) {
    if (enable) {
      this.m_rightButton.setInteractive();
      this.m_rightButton.setAlpha(1);
      this.m_upButton.setInteractive();
      this.m_upButton.setAlpha(1);
    } else {
      this.m_rightButton.disableInteractive();
      this.m_rightButton.setAlpha(0.5);
      this.m_upButton.disableInteractive();
      this.m_upButton.setAlpha(0.5);
    }
  }

  validateMove(move: Move): void {
    if (this.m_moveManager.validateMove(move)) {
    }
  }

  processMove(move: Move): void {
    if (!this.m_moveManager.isValidating) {
      this.m_dancer.dance(move);
    }
  }

  gameOver():void
  {   
      this.m_dancer.lose();
      this.enableButton(false);
      
      let text = new TextPopUp(this, this.cameras.main.width / 2, 640, "TIME'S UP", 1.5);

      this.time.addEvent({
        delay: 1000,
        callback: () => {
            this.m_gameOverUI.setVisible(true);
           
        }
      });

  }
}
