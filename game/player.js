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

        this.isDead =false;
        this.collided=false;
        this.lastPosX;
        this.lastPosY;
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
        if (this.collides(BomberManInst.solidCollision))
        {
            this.collided = true;
        }
        else{
            this.collided = false;
        }

            this.w = 8;
            this.h = 12;





        this.lastPosX=this.x;
        this.lastPosY=this.y;
        if (this.isDead == false)
        {
            //If the player is alive, use the space bar || mouse buttor to let the player soar / flap
            if ((Input.getKeystate(KEYCODE_w) === INPUT_HELD)
                ||(Input.getKeystate(KEYCODE_up_arrow) === INPUT_HELD)
            )
            {
                this.y -= BomberManInst.speed;
            }
            if ((Input.getKeystate(KEYCODE_d) === INPUT_HELD)
                ||(Input.getKeystate(KEYCODE_right_arrow) === INPUT_HELD)
            )
            {
                this.x += BomberManInst.speed;
            }
            if ((Input.getKeystate(KEYCODE_a) === INPUT_HELD)
                ||(Input.getKeystate(KEYCODE_left_arrow) === INPUT_HELD)
            )
            {
                this.x -= BomberManInst.speed;
            }
            if ((Input.getKeystate(KEYCODE_s) === INPUT_HELD)
                ||(Input.getKeystate(KEYCODE_down_arrow) === INPUT_HELD)
            )
            {
                this.y += BomberManInst.speed;
            }

        }




        if(this.collides(BomberManInst.solidCollision)){
           this.x=this.lastPosX;
           this.y=this.lastPosY;
        }



    }


    draw()
    {

        BomberManInst.downTexture.DrawResizedSprite('down_0',new Vector2(this.x,this.y),this.w,this.h);
        if (this.collided == true)
        {
            GAZCanvas.Rect(this, 'rgb(255,255,0)', false, 5);
        }
        else
        {
            GAZCanvas.Rect(this, 'rgb(255,0,0)', false, 5);
        }
        //GAZCanvas.Rect(this, 'rgb(255,0,0)', false, 5);

    }
}