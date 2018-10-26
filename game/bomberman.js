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
        this.upTexture = new TexturePage("assets/whiteup.png", up_tp);
        this.rightTexture = new TexturePage("assets/whiteright.png", right_tp);
        this.downTexture = new TexturePage("assets/whitedown.png", down_tp);
        this.player = new Player();
        this.speed = 1;
        this.solidCollision = new RectCollider();
        this.solidCollision.x = 16;
        this.solidCollision.y = 0;
        this.solidCollision.w = 16;
        this.solidCollision.h = 16;
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
        this.stateMachine.addState(GameState_Start.label(), new GameState_Start());

        this.stateMachine.setState(GameState_Start.label());

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

    // onAttactMode()
    // {
    //     this.isInProgress = false;
    // }

    /*
        onReadyToStartNewGame - Set the game up for a new game
     */
    Start()
    {
        //this.player.init();

        this.speed = 1;
        this.player.isDead = false;
    }

    // onPlayerDeath()
    // {
    //     this.player.isDead = true;
    //     this.stateMachine.setState(GameState_Death.label());
    //     this.playSample('sound_explode');
    // }

    /*
        updateScene()

        Handle all the game updates and scroll the various layers at their different rates for parallax effect
     */
    updateScene()
    {

        this.player.update();
    }

    /*
        drawScene()

        Draw the layers of the game, bg first, then player and pillars finally with the fg
     */
    drawMap(){
        let count=0;
        let line=0;
        for(let tile in mapLayout){
            let width=15;
            let pixels=16;
            if (mapLayout[tile] == 0){
                BomberManInst.texturePage.DrawSprite('grass',new Vector2(count*pixels,line*pixels));
            }
            else if(mapLayout[tile] == 1){
                BomberManInst.texturePage.DrawSprite('solid',new Vector2(count*pixels,line*pixels));
                // this.solidCollision = new RectCollider(count*pixels,line*pixels);
                // this.solidCollision.x = count*pixels;
                // this.solidCollision.y = line*pixels;
                // this.solidCollision.w = pixels;
                // this.solidCollision.h = pixels;
                //GAZCanvas.Rect(solidCollision, 'rgb(255,0,0)', false, 5);

            }
            count++;
            if(count==width){
                line++;
                count=0;
            }

        }
        GAZCanvas.Rect(this.solidCollision, 'rgb(255,0,0)', false, 5);
    }
    drawScene()
    {

        //GAZCanvas.Rect(new Rect(0, 0, 240, 208),'#000000');
        this.drawMap()
        //GAZCanvas.Rect(new Rect(0, 0, 1600, 900),'#000000');
        //draw the bg with wrapping offset to give the impression of scrolling / moving
        //Canvas.DrawSprite('assets/grass.png',new Rect(0,0,16,16));
        //CrappyBirdInst.texturePage.DrawSprite('bg',new Vector2(-this.bgScrollX,0));
        //CrappyBirdInst.texturePage.DrawSprite('bg',new Vector2(144-this.bgScrollX-1,0));


        BomberManInst.player.draw();


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

