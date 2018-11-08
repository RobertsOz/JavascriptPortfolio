class Player extends RectCollider
{
    /*
        Player - the player

        The player is a RectCollider with a sprite
     */
    constructor(playerID,x,y,color)
    {
        super();
        this.id = playerID;
        this.manFrame = 0;
        this.deathFrame = 0;
        this.tileSize=16;
        this.x = x*this.tileSize+4;
        this.y = y*this.tileSize+3;
        this.w = 7;
        this.h = 10;
        this.startPos=[this.x,this.y];
        this.dx = 0;
        this.dy = 0;
        this.isDead =false;
        this.speed = 1;
        this.maxBombs=1;
        this.bombs=this.maxBombs;
        this.strenght=1;
        this.direction="down";
        this.playerColor=color;
        this.collidersAroundPlayer;
        this.topCollision=false;
        this.updateSpeed=false;
        this.collided=false;
    }

    frameName()
    {
        //the bird has 3 frames [0,1,2] to get the text name of the current frame, it's bird_[frame]
        //doing it here reduces the amount of copypasta

        return this.playerColor+'_'+this.direction+'_'+Math.floor(this.manFrame);
    }
    deadFrameName(){
        return 'death_'+Math.floor(this.deathFrame);
    }
    init()
    {
        this.x= this.startPos[0];
        this.y= this.startPos[1];
        this.deathFrame = 0;
        this.manFrame = 0;
        this.maxBombs = 1;
        this.bombs=this.maxBombs;
        this.strenght = 1;
        this.speed = 1;
        this.isDead =false;
    }

    update()
    {


            //update the bird's animation frames very slowly


            if (this.manFrame >= 7)
            {
                this.manFrame -= 7;
            }

            //get the size of the bird based on the size of its current frame
            //and use those values for its RectCollider







        if (this.isDead == false)
        {
            //If the player is alive, use the space bar || mouse buttor to let the player soar / flap
            if(this.id===1){
                if (Input.getKeystate(KEYCODE_w) === INPUT_HELD)
                {
                    this.dy -= this.speed;
                    this.direction="up";
                }
                if (Input.getKeystate(KEYCODE_d) === INPUT_HELD)
                {
                    this.dx += this.speed;
                    this.direction="right";
                }
                if (Input.getKeystate(KEYCODE_a) === INPUT_HELD)
                {
                    this.dx -= this.speed;
                    this.direction="left";
                }
                if (Input.getKeystate(KEYCODE_s) === INPUT_HELD)
                {
                    this.dy += this.speed;
                    this.direction="down";
                }
                if(Input.getKeystate(KEYCODE_space_bar) === INPUT_PRESSED){
                    if(this.bombs !=0){
                        this.placeBomb();
                        this.bombs--;
                    }
                }
            }
            else if(this.id===2){
                if (Input.getKeystate(KEYCODE_up_arrow) === INPUT_HELD)
                {
                    this.dy -= this.speed;
                    this.direction="up";
                }
                if (Input.getKeystate(KEYCODE_right_arrow) === INPUT_HELD)
                {
                    this.dx += this.speed;
                    this.direction="right";
                }
                if (Input.getKeystate(KEYCODE_left_arrow) === INPUT_HELD)
                {
                    this.dx -= this.speed;
                    this.direction="left";
                }
                if (Input.getKeystate(KEYCODE_down_arrow) === INPUT_HELD)
                {
                    this.dy += this.speed;
                    this.direction="down";
                }
                if(Input.getKeystate(KEYCODE_enter) === INPUT_PRESSED){
                    if(this.bombs !=0){
                        this.placeBomb();
                        this.bombs--;
                    }
                }
            }

            this.x += this.dx;
            this.y += this.dy;

            if(this.dx>0 || this.dx<0 || this.dy>0 || this.dy<0){
                this.manFrame += this.speed / 4;
            }



        this.topCollision=false;
        for (let bomb in BomberManInst.bombList){
            if(BomberManInst.bombList[bomb].finished===false){
                if(this.collides(BomberManInst.bombList[bomb].collision)=="top" || this.collides(BomberManInst.bombList[bomb].collision)=="bottom"){
                    this.y-=this.dy;
                }
                else if(this.collides(BomberManInst.bombList[bomb].collision)=="left" || this.collides(BomberManInst.bombList[bomb].collision)=="right"){
                    this.x-=this.dx;

                }
            }
        }
        if(BomberManInst.upgradeList.length>0){
            for (let upgrade in BomberManInst.upgradeList){
                if(this.collides(BomberManInst.upgradeList[upgrade].collision)!=false){
                    if(BomberManInst.upgradeList[upgrade].upgrade == "bombs"){
                        this.maxBombs++;
                        this.bombs++;
                    }
                    else if(BomberManInst.upgradeList[upgrade].upgrade == "die"){
                        this.isDead=true;

                    }
                    else if(BomberManInst.upgradeList[upgrade].upgrade == "speed"){
                        this.updateSpeed=true;
                    }
                    else if(BomberManInst.upgradeList[upgrade].upgrade == "fire"){
                        this.strenght++;
                    }
                    BomberManInst.upgradeList[upgrade].isDone=true;
                }
            }
        }
        this.collidersAroundPlayer = BomberManInst.map.getCollidersAround(BomberManInst.map.getTilePosition(this.x+this.w/2,this.y+this.h/2))
        for (let i=0;i<this.collidersAroundPlayer.length;i++)
        {
            if(this.collides(this.collidersAroundPlayer[i])=="top" || this.collides(this.collidersAroundPlayer[i])=="bottom"){
                if(this.collides(this.collidersAroundPlayer[i])=="top"){
                    this.topCollision=true;
                }
                this.y-=this.dy;
                this.collided=true;
            }
            else if(this.collides(this.collidersAroundPlayer[i])=="left" || this.collides(this.collidersAroundPlayer[i])=="right"){
                this.x-=this.dx;
                this.collided=true;
                //Cancel out top collision if there should be no top collision (top collision is recognised first from the collidersAroundPlayer array)
                if(this.topCollision==true && !(BomberManInst.map.shouldCollideTop(BomberManInst.map.getTilePosition(this.x+this.w/2,this.y+this.h/2)))){
                    this.y+=this.dy;
                }
            }
            else if(this.collided==false && i==this.collidersAroundPlayer.length-1){
                if(Boolean(this.updateSpeed)){
                    this.speed += 0.17;
                    this.updateSpeed = false;
                }
            }
        }
        if(BomberManInst.fireList.length>0){
            for (let fire in BomberManInst.fireList){
                for(let col in BomberManInst.fireList[fire])
                {
                    if(this.collides(BomberManInst.fireList[fire][col])!=false){
                        this.isDead = true;
                    }
                }
            }
        }



        this.dx = 0;
        this.dy = 0;
        this.collided=false;
        }
        else {
            if(this.deathFrame<=4){
                this.deathFrame += this.speed / 10;
            }
        }

    }
    placeBomb(){
        BomberManInst.bombList.push(new Bomb(BomberManInst.map.getTilePosition(this.x+this.w/2,this.y+this.h/2),this.strenght,this.playerColor))
    }

    draw()
    {
        if(this.isDead == false){
            if(this.direction=="down"){
                BomberManInst.downTexture.DrawResizedSprite(this.frameName(),new Vector2(this.x,this.y),this.w,this.h);
            }
            else if(this.direction=="up"){
                BomberManInst.upTexture.DrawResizedSprite(this.frameName(),new Vector2(this.x,this.y),this.w,this.h);
            }
            else if(this.direction=="left"){
                BomberManInst.leftTexture.DrawResizedSprite(this.frameName(),new Vector2(this.x,this.y),this.w,this.h);
            }
            else if(this.direction=="right"){
                BomberManInst.rightTexture.DrawResizedSprite(this.frameName(),new Vector2(this.x,this.y),this.w,this.h);
            }
        }
        else{
            if(this.deathFrame<=4){
                BomberManInst.deathTexture.DrawResizedSprite(this.deadFrameName(),new Vector2(this.x,this.y),this.w,this.h);
            }
            else{
                BomberManInst.stateMachine.setState(GameState_Death.label());
            }

        }

        //GAZCanvas.Rect(this, this.color, false, 5);


        //GAZCanvas.Rect(this, 'rgb(255,0,0)', false, 5);

    }
}