import * as Phaser from "phaser";


export default class RoundSummary extends Phaser.GameObjects.Container 
{
    constructor(scene:Phaser.Scene, x:number ,y:number)
    {   
        let children = [];

        let panelTitle = new Phaser.GameObjects.Rectangle(scene, 0, -200, 300, 150,  0x2a81bf)
        children.push(panelTitle);
        let panel = new Phaser.GameObjects.Rectangle(scene, 0, 0, 650, 500, 0x2a81bf);

        children.push(panel);

        super(scene,x, y, children);

        scene.add.existing(this);

    }


}