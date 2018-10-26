class GameState_Start extends StateMachineState
{
    static label()
    {
        return "GameState_Start";
    }

    constructor()
    {
        super();
    }

    init()
    {
        super.init()
        BomberManInst.Start();
    }

    update()
    {
        super.update()
        BomberManInst.updateScene()

    }

    draw()
    {
        super.draw()
        BomberManInst.drawScene()
        //GAZCanvas.Rect(new Rect(0, 0, 240, 208),'#000000');
        //BomberManInst.texturePage.DrawSprite('grass',new Vector2(0,0));
        //BomberManInst.drawScene();
        //GAZCanvas.Sprite('assets/grass.png',new Rect(0,0,16,16));
        //BomberManInst.DrawSprite('assets/grass.png',new Vector2(0,0));
        //BomberManInst.player.draw();

        //GAZCanvas.Rect(new Rect(144/2,0,1,256),'rgb(255,0,0)');
    }
}