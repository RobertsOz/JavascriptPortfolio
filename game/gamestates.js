class GameState_Attract extends StateMachineState{
    static label()
    {
        return "GameState_Attract";
    }
    constructor()
    {
        super();
    }

    init()
    {
        super.init()
        BomberManInst.onAttractMode();
    }

    update()
    {
        super.update()
        // onclick or space switch gamestate
        if ((Input.getKeystate(KEYCODE_space_bar) === INPUT_PRESSED)
            ||(Input.currentMouseState == INPUT_PRESSED)
        )
        {
            BomberManInst.stateMachine.setState(GameState_Ready.label());
        }
    }

    draw()
    {
        super.draw()
        BomberManInst.drawScene()//Draw the map as BG
        let titleTp = new TexturePage("assets/title.png",title_tp); // Title screen
        let startTp = new TexturePage("assets/startgame.png",title_tp); // Start game text
        titleTp.DrawResizedSprite("title",new Vector2(4,20),232,60);//Draw title screen
        if(BomberManInst.frameCount%60 > 30)//Blink taken from CrappyBird example
        {
            startTp.DrawResizedSprite('start', new Vector2(232/2-25, 201/2+50),50,12);//Draw Start game Text
        }

    }
}
class GameState_Ready extends StateMachineState{
    static label()
    {
        return "GameState_Ready";
    }
    constructor()
    {
        super();
    }

    init()
    {
        super.init()
        BomberManInst.onReady();
    }

    update()
    {
        super.update()
        if ((Input.getKeystate(KEYCODE_space_bar) === INPUT_PRESSED)
            ||(Input.currentMouseState == INPUT_PRESSED)
        )
        {
            BomberManInst.stateMachine.setState(GameState_Start.label());
        }

    }

    draw()
    {
        super.draw()
        BomberManInst.drawScene()//Draw BG
        let readyTp = new TexturePage("assets/ready.png",title_tp);//Instructions
        let startTp = new TexturePage("assets/startgame.png",title_tp);//Same button from Attract
        readyTp.DrawSprite("ready",new Vector2(0,0));//Draw Instructions
        if(BomberManInst.frameCount%60 > 30)
        {
            startTp.DrawResizedSprite('start', new Vector2(232/2-25, 201/2+50),50,12);
        }
    }
}
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
    }
}
class GameState_Death extends StateMachineState
{
    static label()
    {
        return "GameState_Death";
    }

    constructor()
    {
        super();
    }

    init()
    {
        super.init()
        BomberManInst.onDeath();
    }

    update()
    {
        super.update()
        BomberManInst.updateScene()
        //Restart the game
        if ((Input.getKeystate(KEYCODE_space_bar) === INPUT_PRESSED)
            ||(Input.currentMouseState == INPUT_PRESSED)
        )
        {
            BomberManInst.stateMachine.setState(GameState_Attract.label());
        }

    }

    draw()
    {
        super.draw()
        BomberManInst.drawScene()
        let winner1Tp = new TexturePage("assets/p1win.png",title_tp);//Player 1 winning image
        let winner2Tp = new TexturePage("assets/p2win.png",title_tp);//Player 2 winning image
        if(BomberManInst.winner == "p1"){
            winner1Tp.DrawSprite("ready",new Vector2(0,0));
        }
        else if(BomberManInst.winner == "p2"){
            winner2Tp.DrawSprite("ready",new Vector2(0,0));
        }
    }
}