class BomberMan
{
    /*
        BomberMan
            Main Bomberman class
     */

    constructor()
    {
        this.frameCount = 0;
        this.stateMachine = new StateMachine();
        this.texturePage = new TexturePage("assets/game_tp.png", game_tp);
        this.upTexture = new TexturePage("assets/up.png", up_tp);
        this.rightTexture = new TexturePage("assets/right.png", right_tp);
        this.downTexture = new TexturePage("assets/down.png", down_tp);
        this.leftTexture = new TexturePage("assets/left.png", right_tp);
        this.deathTexture = new TexturePage("assets/death.png",death_tp);
        this.isInProgress = false;
        this.bombList=[];
        this.fireList=[];
        this.upgradeList=[];
        this.upgrades = ["bombs","die","speed","fire"];
        this.map = new Map();
        this.player1 = new Player(1,1,1,"white");
        this.player2 = new Player(2,13,11,"black");
        this.winner;
    }

    /*
        oneTimeInit() - One time initialisation function


     */
    oneTimeInit()
    {
        //Set the reference screen size to b 232.5x201.5 so that the game will scale to fit the aspect of the browser

        GAZCanvas.referenceScreenSize = new Size(232.5, 201.5);

        //set up state machine and set initial state to GameState_Attract
        this.stateMachine.addState(GameState_Attract.label(), new GameState_Attract());
        this.stateMachine.addState(GameState_Ready.label(), new GameState_Ready());
        this.stateMachine.addState(GameState_Start.label(), new GameState_Start());
        this.stateMachine.addState(GameState_Death.label(), new GameState_Death());

        this.stateMachine.setState(GameState_Attract.label());

    }

    onAttractMode()//set InProgress to false in case the players play again.
    {
        this.isInProgress = false;
    }
    onReady(){//Reset everything to the starting positions so the game could be replayed multiple times
        this.player1.init();
        this.player2.init();
        this.player1.isDead = false;
        this.player2.isDead = false;
        this.isInProgress = true;
        this.bombList=[];
        this.fireList=[];
        this.upgradeList=[];
        this.map = new Map();
    }


    onDeath()
    {
        if(this.player1.isDead==true){
            this.winner ="p2";
        }
        else if(this.player2.isDead == true){
            this.winner ="p1";
        }
        this.isInProgress=false
    }

    /*
        updateScene()

        Handle all the game updates and scroll the various layers at their different rates for parallax effect
     */
    updateScene()
    {

        this.player1.update();
        this.player2.update();
        /*Check if the fire should explode a bomb or destroy an upgrade*/
        if(this.fireList.length>0){
            for (let fire in this.fireList){
                for(let col in this.fireList[fire]) {
                    if(this.upgradeList.length>0){
                        for (let upgrade in this.upgradeList){
                            if(this.upgradeList[upgrade].collision.collides(this.fireList[fire][col])!=false && this.upgradeList[upgrade].immune==false){
                                this.upgradeList[upgrade].isDone = true;
                            }
                        }
                    }
                    if(this.bombList.length>0){
                        for(let bomb in this.bombList){
                            if(BomberManInst.bombList[bomb].finished===false) {
                                if (this.bombList[bomb].collision.collides(this.fireList[fire][col]) != false) {
                                    this.bombList[bomb].frame = this.bombList[bomb].fps * this.bombList[bomb].lifespan; //set the frame to the last frame so the bomb explodes in the right order
                                }
                            }
                        }
                    }

                }
            }
        }
        /*use the debug element to display values you might need*/
        //document.getElementById("debug").innerHTML = "X: "+ this.map.getTilePosition(this.player.x+this.player.w/2,this.player.y+this.player.h/2)[0] + " Y: " + this.map.getTilePosition(this.player.x+this.player.w/2,this.player.y+this.player.h/2)[1];
    }

    /*
        drawScene()

        Draw the layers of the game, bg first, then player and pillars finally with the fg
     */
    drawScene()
    {

        this.map.draw();

        if(this.isInProgress==true){
            /*
            Draw all the placed bombs
            replenish player bombs if they explode
            and remove exploded bombs from the bomblist
            */
            for (let bomb in this.bombList){
                this.bombList[bomb].draw();
                if(this.bombList[bomb].finished ==true && this.bombList[bomb].firstExplosionFrame==true){
                    this.fireList.push(this.bombList[bomb].fireCollision);
                }
                if(this.bombList[bomb].exploded == true){
                    if(this.player1.bombs!=this.player1.maxBombs&& this.bombList[bomb].player=="white") {
                        this.player1.bombs++;
                    }
                    else if(this.player2.bombs!=this.player2.maxBombs&& this.bombList[bomb].player=="black"){
                        this.player2.bombs++;
                    }
                    this.bombList.splice(bomb,1);
                    this.fireList.shift();
                }
            }
            this.player1.draw();
            this.player2.draw();
            //Draw the upgrades
            for (let upgrade in this.upgradeList){
                this.upgradeList[upgrade].draw();
                if(this.upgradeList[upgrade].isDone ==true){
                    this.upgradeList.splice(upgrade,1);
                }
            }
        }
    }



    /*
        Run()

        main game loop, called from index.html
     */

    Run()
    {
        BomberManInst.oneTimeInit();
        setInterval(function()
        {
            //Update GAZCanvas to keep the application reactive (the correct aspect ratio)
            GAZCanvas.update();

            //update input control
            Input.update();

            BomberManInst.frameCount+= 1;
            BomberManInst.stateMachine.update();

            //draw current game state

            BomberManInst.stateMachine.draw();

        },17);
    }
}

BomberManInst = new BomberMan();

