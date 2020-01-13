import GameScene from "../Scene/GameScene";

export default class GameOver 
{
   private gameOverContainer: Phaser.GameObjects.Container;

    constructor(scene:GameScene)
    {
        let children =  [];

        //const panel = scene.add.rectangle(0, 0, 600, 480, 0x2a81bf);
      //  children.push(panel);
        const replayButton = scene.add.image(0,50, 'replay');
        scene.add.existing(replayButton);
        replayButton.setInteractive();
        children.push(replayButton);

        const gameOverText = scene.add.text(0, -200, "GAME OVER", { fontSize: 60 }).setOrigin(0.5);;
        replayButton.setScale(0.7);

      
        replayButton.on('pointerover', () => { replayButton.setScale(0.9)});

        replayButton.on('pointerdown', () => { replayButton.setScale(0.7);
           scene.reset();
           this.setVisible(false);
        })

        replayButton.on('pointerout', () => { replayButton.setScale(0.7)});
        children.push(gameOverText);
        
        this.gameOverContainer = new Phaser.GameObjects.Container(scene, scene.cameras.main.width/2, scene.cameras.main.height/2 - 100, children);
        scene.add.existing(this.gameOverContainer);



        this.gameOverContainer.setDepth(2);
    }

    public setVisible(isVisible: boolean)
    {
        this.gameOverContainer.setVisible(isVisible);
    }

}