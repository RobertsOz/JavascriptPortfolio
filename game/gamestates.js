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
        BomberManInst.drawScene()
        let titleTp = new TexturePage("assets/title.png",title_tp);
        let startTp = new TexturePage("assets/startgame.png",title_tp);
        titleTp.DrawResizedSprite("title",new Vector2(4,20),232,60);
        if(BomberManInst.frameCount%60 > 30)
        {
            startTp.DrawResizedSprite('start', new Vector2(232/2-25, 201/2+50),50,12);
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
        BomberManInst.drawScene()
        let readyTp = new TexturePage("assets/ready.png",title_tp);
        let startTp = new TexturePage("assets/startgame.png",title_tp);
        readyTp.DrawSprite("ready",new Vector2(0,0));
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
        let winner1Tp = new TexturePage("assets/p1win.png",title_tp);
        let winner2Tp = new TexturePage("assets/p2win.png",title_tp);
        if(BomberManInst.winner == "p1"){
            winner1Tp.DrawSprite("ready",new Vector2(0,0));
        }
        else if(BomberManInst.winner == "p2"){
            winner2Tp.DrawSprite("ready",new Vector2(0,0));
        }
    }
}