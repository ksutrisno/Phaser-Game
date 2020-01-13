import * as Phaser from "phaser";
import { Move } from "../Move";
import GameScene from "../scene/GameScene";
import ScorePopUp from "../Object/ScorePopUp";
import {animationHelper} from "../Helper/AnimationHelper";

class MoveObject extends Phaser.GameObjects.Image {
  private move: Move;

  public getMove(): Move {
    return this.move;
  }

  constructor(scene: GameScene, x: number, y: number, key: Move) {
    super(scene, x, y, key);
    scene.add.existing(this);

    this.move = key;
  }
}

class Slot extends Phaser.GameObjects.Image
{
    private dot;

    constructor(scene: GameScene, x: number, y: number) {
        super(scene, x, y, 'slot');
        scene.add.existing(this);
        this.dot = scene.add.circle(x, y + 75, 5, 0xff0000)

        this.dot.setVisible(false);

      }

      showMark(visible:boolean)
      {
          this.dot.setVisible(visible);
      }

      show(visible:boolean)
      {
         this.setVisible(visible);
      }

      destroyDot()
      {
          this.dot.destroy();
      }



}

const k_delayBetweenMove = 650;
const k_inputDelay = 150;
const k_maxMoveCount = 9;
const k_minMoveCount = 4;

export default class MoveManager {
  private m_scene: GameScene;
  private m_currentIndex: number = 0;
  private m_currMoveCount: number = k_minMoveCount;
  private m_moves: MoveObject[] = [];
  private m_slots:Slot[] = [];
  private m_isValidating: boolean = false;
  private m_correctSound: Phaser.Sound.BaseSound;
  private m_wrongSound: Phaser.Sound.BaseSound;

  get isValidating(): boolean {
    return this.m_isValidating;
  }

  get currMoveCount(): number {
    return this.m_currMoveCount;
  }

  set currMoveCount(count:number)
  {
      if(count > k_maxMoveCount)
      {
          count = k_maxMoveCount;
      }
      this.m_currMoveCount = count;
  }


  constructor(scene: GameScene) {
    this.m_scene = scene;

    this.createMoveSlots();

    this.m_correctSound = scene.sound.add('correct');  
    this.m_wrongSound = scene.sound.add('wrong');  
  }

  public reset()
  {
      this.m_currMoveCount = k_minMoveCount;
  }

  public createMoveSlots() {
    this.clearSlots();

    for (let i = 0; i < this.m_currMoveCount; i++) {
      let width = this.m_scene.cameras.main.width;
      let slot = new Slot(this.m_scene, 
        width/(this.m_currMoveCount+1) * (i+1) ,
        725
      );
      
      let max = this.currMoveCount < 5 ? 5 : this.currMoveCount;

      slot.setScale(1.90 * 5 / max);
      this.m_slots.push(slot);
      slot.setVisible(false);
    }
  }

  showMoveSlots(show:boolean) {
    for (let i = 0; i < this.m_slots.length; i++) {
            this.m_slots[i].show(show); 

            if(!show)
            {
                this.m_slots[i].showMark(show); 
            }
    }
  }

  generateMoves() {
    this.clearMoves();

    this.m_moves = [];

    for (let i = 0; i < this.m_currMoveCount; i++) {
      let rand = Math.round(Math.random());

      let move: Move;
      if (rand == 0) {
        move = Move.kUp;
      } else {
        move = Move.kRight;
      }

      this.fillSlot(move, i);
    }
  }
  
  displayMove(index:number)
  {
    this.m_moves[index].setVisible(true);
      
    let scale = this.m_moves[index].scale;

    this.m_moves[index].setScale(scale/1.5);

    animationHelper.Resize(this.m_scene, this.m_moves[index], 0.1, scale)

    this.m_correctSound.play();
  }

  validateMove(move: Move):boolean {

    let isValid = false;
    if (this.m_isValidating === true) {
      return isValid;
    }


    if (move === this.m_moves[this.m_currentIndex].getMove()) {
     
      this.displayMove(this.m_currentIndex);
      this.addScore(move);
      this.m_currentIndex++;
      isValid = true;
    }
    else
    {   
        let width = this.m_scene.cameras.main.width;
        let x = this.m_scene.add.image(
            (width/(this.m_currMoveCount+1) * (this.m_currentIndex+1)),
          725,
          'x'
        );
        this.m_slots[this.m_currentIndex].showMark(true);
        this.m_scene.wrongMove();
        this.m_currentIndex = 0;
        this.m_wrongSound.play();

        this.m_scene.time.addEvent({
            delay: 1000,
            callback: () => {
              this.hideMoves();
              x.destroy();
            }
          });
        
    }

    this.m_isValidating = true;

    this.m_scene.time.addEvent({
      delay: k_inputDelay,
      callback: () => {
        this.m_isValidating = false;
        if (this.m_currentIndex === this.m_currMoveCount) {
          this.m_scene.roundComplete();
          for (let i = 0; i < this.m_currMoveCount; i++) 
          {
            let scale = this.m_moves[i].scale;
            animationHelper.Pulse(this.m_scene, this.m_moves[i], 0.4, scale * 1.10, 3);
            animationHelper.Swing(this.m_scene, this.m_moves[i], 0.4, 30, 3)
       
          }

          this.m_currentIndex = 0;
        }
      }
    });

    return isValid;

  }

  private fillSlot(move: Move, index: number) {
    let width = this.m_scene.cameras.main.width;
    let moveObject = new MoveObject(
      this.m_scene,
      width/ (this.m_currMoveCount+1) * (index+1),
      725,
      move
    );
    let max = this.currMoveCount < 5 ? 5 : this.currMoveCount;
    moveObject.setScale(0.70 * 5 / max);
    moveObject.setVisible(false);

    this.m_moves.push(moveObject);
  }

  displayMoves() {
    for (let i = 0; i < this.m_moves.length; i++) {
      this.m_scene.time.addEvent({
        delay: k_delayBetweenMove * (i + 1),

        callback: () => {
          this.displayMove(i);
          this.m_scene.processMove(this.m_moves[i].getMove());
        }
      });
    }

    this.m_scene.time.addEvent({
      delay:
        k_delayBetweenMove * this.m_currMoveCount + k_delayBetweenMove + 100,
      callback: () => {
        this.hideMoves();
        this.m_scene.startInputPhase();
      }
    });
  }

  private hideMoves() {
    for (let i = 0; i < this.m_moves.length; i++) {
      this.m_moves[i].setVisible(false);
    }
  }

  private clearMoves() {
    for (let i = 0; i < this.m_moves.length; i++) {
      this.m_moves[i].destroy();
    }

    this.m_moves = [];
  }

  private clearSlots() {
    for (let i = 0; i < this.m_slots.length; i++) {
        this.m_slots[i].destroyDot();
      this.m_slots[i].destroy();
    }

    this.m_slots = [];
  }

  private addScore(move:Move)
  {
    let width = this.m_scene.cameras.main.width;
    new ScorePopUp(this.m_scene, (width/(this.m_currMoveCount+1)) * (this.m_currentIndex + 1), 660, "+100", move, 0.5);
  }

}
