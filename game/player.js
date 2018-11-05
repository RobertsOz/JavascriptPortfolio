class Player extends RectCollider
{
    /*
        Player - the player

        The player is a RectCollider with a sprite
     */
    constructor()
    {
        super();
        this.manFrame = 0;

        this.x = 20;
        this.y = 18;
        this.dx = 0;
        this.dy = 0;
        this.isDead =false;
        this.speed = 1;
        this.maxBombs=1;
        this.bombs=this.maxBombs;
        this.strenght=5;
        this.bombList=[];
    }

    frameName()
    {
        //the bird has 3 frames [0,1,2] to get the text name of the current frame, it's bird_[frame]
        //doing it here reduces the amount of copypasta

        //return 'bird_'+Math.floor(this.birdFrame);
    }

    init()
    {
        this.manFrame = 0;

        this.x = 0;
        this.y = 0;

        this.isDead =false;
    }

    update()
    {


            //update the bird's animation frames very slowly
            //this.manFrame += BomberManInst.speed / 10;

            // while (this.manFrame >= 3)
            // {
            //     this.manFrame -= 3;
            // }

            //get the size of the bird based on the size of its current frame
            //and use those values for its RectCollider

            this.w = 8;
            this.h = 12;





        if (this.isDead == false)
        {
            //If the player is alive, use the space bar || mouse buttor to let the player soar / flap
            if ((Input.getKeystate(KEYCODE_w) === INPUT_HELD)
                ||(Input.getKeystate(KEYCODE_up_arrow) === INPUT_HELD)
            )
            {
                this.dy -= this.speed;
            }
            if ((Input.getKeystate(KEYCODE_d) === INPUT_HELD)
                ||(Input.getKeystate(KEYCODE_right_arrow) === INPUT_HELD)
            )
            {
                this.dx += this.speed;
            }
            if ((Input.getKeystate(KEYCODE_a) === INPUT_HELD)
                ||(Input.getKeystate(KEYCODE_left_arrow) === INPUT_HELD)
            )
            {
                this.dx -= this.speed;
            }
            if ((Input.getKeystate(KEYCODE_s) === INPUT_HELD)
                ||(Input.getKeystate(KEYCODE_down_arrow) === INPUT_HELD)
            )
            {
                this.dy += this.speed;
            }
            if(Input.getKeystate(KEYCODE_space_bar) === INPUT_PRESSED){
                if(this.bombs !=0){
                    this.placeBomb();
                    this.bombs--;
                }
            }
            this.x += this.dx;
            this.y += this.dy;
        }

        // if(this.collides(BomberManInst.solidCollision)=="top"){
        //     this.color = "rgb(255,255,0)";
        // }
        // if(this.collides(BomberManInst.solidCollision)=="bottom"){
        //     this.color = "rgb(0,255,0)";
        // }
        // if(this.collides(BomberManInst.solidCollision)=="left"){
        //     this.color = "rgb(0,0,255)";
        // }
        // if(this.collides(BomberManInst.solidCollision)=="right"){
        //     this.color = "rgb(0,0,0)";
        // }
        // if(this.collides(BomberManInst.solidCollision)==false)
        // {
        //     this.color = "rgb(255,0,0)";
        // }
        // if(this.collides(BomberManInst.solidCollision)==true){
        //     this.color = "rgb(255,255,255)";
        // }
        let topCollision=false;
        for (let bomb in this.bombList){
            if(this.collides(this.bombList[bomb].collision)=="top" || this.collides(this.bombList[bomb].collision)=="bottom"){
                this.y-=this.dy;
            }
            else if(this.collides(this.bombList[bomb].collision)=="left" || this.collides(this.bombList[bomb].collision)=="right"){
                this.x-=this.dx;

            }
        }
        let collidersAroundPlayer = BomberManInst.map.getCollidersAround(BomberManInst.map.getTilePosition(this.x+this.w/2,this.y+this.h/2))
        for (let i=0;i<collidersAroundPlayer.length;i++)
        {
            if(this.collides(collidersAroundPlayer[i])=="top" || this.collides(collidersAroundPlayer[i])=="bottom"){
                if(this.collides(collidersAroundPlayer[i])=="top"){
                    topCollision=true;
                }
                this.y-=this.dy;
            }
            else if(this.collides(collidersAroundPlayer[i])=="left" || this.collides(collidersAroundPlayer[i])=="right"){
                this.x-=this.dx;
                //Cancel out top collision if there should be no top collision (top collision is recognised first from the collidersAroundPlayer array)
                if(topCollision==true && !(BomberManInst.map.shouldCollideTop(BomberManInst.map.getTilePosition(this.x+this.w/2,this.y+this.h/2)))){
                    this.y+=this.dy;
                }
            }
        }

        // if(this.collides(BomberManInst.solidCollision)=="top" || this.collides(BomberManInst.solidCollision)=="bottom"){
        //     this.y-=this.dy;
        // }
        // if(this.collides(BomberManInst.solidCollision)=="left" || this.collides(BomberManInst.solidCollision)=="right"){
        //     this.x-=this.dx;
        // }
        this.dx = 0;
        this.dy = 0;

    }
    placeBomb(){
        this.bombList.push(new Bomb(BomberManInst.map.getTilePosition(this.x+this.w/2,this.y+this.h/2),this.strenght))
    }

    draw()
    {
        for (let bomb in this.bombList){
            this.bombList[bomb].draw();
            if(this.bombList[bomb].exploded == true){
                this.bombList.shift();
                if(this.bombs!=this.maxBombs) {
                    this.bombs++;
                }
            }
        }
        BomberManInst.downTexture.DrawResizedSprite('down_0',new Vector2(this.x,this.y),this.w,this.h);
        //GAZCanvas.Rect(this, this.color, false, 5);


        //GAZCanvas.Rect(this, 'rgb(255,0,0)', false, 5);

    }
}