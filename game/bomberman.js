class BomberMan
{
    /*
        CrappyBird
            Main crappybird class, handles everythign apart from gamestate definitions (gamestates.js), player (player.js) & pillar (pillar.js)
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

        Sets up statemachne & audio system
     */
    oneTimeInit()
    {
        //Set the reference screen size to b 240x208 so that the game will scale to fit the aspect of the browser

        GAZCanvas.referenceScreenSize = new Size(232.5, 201.5);

        //set up state machine and set initial state to GameState_Attract
        this.stateMachine.addState(GameState_Attract.label(), new GameState_Attract());
        this.stateMachine.addState(GameState_Ready.label(), new GameState_Ready());
        this.stateMachine.addState(GameState_Start.label(), new GameState_Start());
        this.stateMachine.addState(GameState_Death.label(), new GameState_Death());

        this.stateMachine.setState(GameState_Attract.label());

        // //set up audio and load all the samples
        // this.audio_context = new (window.AudioContext || window.webkitAudioContext)();
        //
        // this.masterVolume = this.audio_context.createGain();
        // this.masterVolume.gain.value = 1.0;
        // this.masterVolume.connect(this.audio_context.destination);
        //
        // let sampleLabels = ["sound_coin", "sound_explode", "sound_hit","sound_jump","sound_shoot"];
        //
        // //load each sample and get them to use the function callback on successful load
        // for(let i=0;i<sampleLabels.length;i++)
        // {
        //     this.loadSample('assets/audio/'+sampleLabels[i]+".wav",sampleLabels[i],function(buffer,name)
        //     {
        //         //add sample data to bufferLookup as a dictionary entry of name -> buffer
        //         BomberManInst.bufferLookup[name] = buffer;
        //     });
        // }
    }

    // //loadSample - this handles the local get for sample files
    // loadSample(url, name, callback)
    // {
    //     let request = new XMLHttpRequest();
    //     request.open('GET', url, true);
    //     request.responseType = 'arraybuffer';
    //     request.onload = function()
    //     {
    //         let audioData = request.response;
    //         BomberManInst.audio_context.decodeAudioData(audioData, function(buffer)
    //         {
    //             callback(buffer,name);
    //         });
    //     };
    //     request.send();
    // }
    //
    // /*
    //     playSample(string name)
    //
    //     Play a sample on demand using 'name' as a look up into the bufferLookup
    //  */
    // playSample(name)
    // {
    //     if(name in this.bufferLookup)
    //     {
    //         let player = this.audio_context.createBufferSource();
    //         player.buffer = this.bufferLookup[name];
    //         player.loop = false;
    //         player.connect(this.masterVolume);
    //         player.start(this.audio_context.currentTime);
    //     }
    // }

    onAttractMode()
    {
        this.isInProgress = false;
    }
    onReady(){
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
    /*
        onReadyToStartNewGame - Set the game up for a new game
     */

    Start()
    {

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
        //document.getElementById("debug").innerHTML = "X: "+ this.map.getTilePosition(this.player.x+this.player.w/2,this.player.y+this.player.h/2)[0] + " Y: " + this.map.getTilePosition(this.player.x+this.player.w/2,this.player.y+this.player.h/2)[1];
    }

    /*
        drawScene()

        Draw the layers of the game, bg first, then player and pillars finally with the fg
     */
    drawScene()
    {

        //GAZCanvas.Rect(new Rect(0, 0, 240, 208),'#000000');
        //GAZCanvas.Rect(new Rect(0, 0, 1600, 900),'#000000');
        //draw the bg with wrapping offset to give the impression of scrolling / moving
        //Canvas.DrawSprite('assets/grass.png',new Rect(0,0,16,16));
        //CrappyBirdInst.texturePage.DrawSprite('bg',new Vector2(-this.bgScrollX,0));
        //CrappyBirdInst.texturePage.DrawSprite('bg',new Vector2(144-this.bgScrollX-1,0));

        this.map.draw();
        if(this.isInProgress==true){
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
            for (let upgrade in this.upgradeList){
                this.upgradeList[upgrade].draw();
                if(this.upgradeList[upgrade].isDone ==true){
                    this.upgradeList.splice(upgrade,1);
                }
            }
        }
        //GAZCanvas.Rect(this.solidCollision, 'rgb(255,0,0)', false, 5);



        //draw the fg with wrapping offset to give the impression of scrolling / moving
        //CrappyBirdInst.texturePage.DrawSprite('fg',new Vector2(-this.fgScrollX,200));
        //CrappyBirdInst.texturePage.DrawS
        // prite('fg',new Vector2(154-this.fgScrollX-1,200));

        // if(this.isInProgress === true)
        // {
        //     let str = this.score.toString();
        //
        //     let pos = new Vector2((144 / 2 - (str.length * 7.5) / 2), 20);
        //
        //     for (let i = 0; i < str.length; i++)
        //     {
        //         this.texturePage.DrawSprite('big_' + str[i], pos);
        //         pos.x += this.texturePage.metadata.lookup['big_' + i].w + 1;
        //     }
        // }
        //
        // if(CrappyBirdInst.debugDraw === true)
        // {
        //     GAZCanvas.Rect(this.floor, 'rgb(255,0,0)', false, 5);
        // }
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

            //update input controll
            Input.update();

            BomberManInst.frameCount+= 1;
            BomberManInst.stateMachine.update();

            //draw background in letterbox colour
            //let letterboxColour = 'rgb(32,32,32)';
            //Canvas.Rect(new Rect(0, 0, window.innerWidth, window.innerHeight),letterboxColour);

            //draw current game state

            BomberManInst.stateMachine.draw();
            //draw letterbox on top of everything to hide whatever needs hiding ;)
            //GAZCanvas.drawLetterbox(letterboxColour);
            //want the screen rect drawn?
            //GAZCanvas.Rect(new Rect(0,0,GAZCanvas.referenceScreenSize.w,GAZCanvas.referenceScreenSize.h),'rgb(255,0,0)',false,2);

            //let rect = new Rect(0,0,65,10);
            //GAZCanvas.Rect(rect, 'rgb(127,127,32)');
            //GAZCanvas.Text(8, 'Click Here To Quit',new Vector2(1,7),'#ffffff','left');

            // if( (rect.isInMe(Input.mouseLogicalPos) == true)
            //     &&(Input.currentMouseState !== INPUT_NOT_PRESSED)
            // )
            // {
            //     console.log("quit");
            //     window.location.href = '../';
            // }

        },17);
    }
}

BomberManInst = new BomberMan();

