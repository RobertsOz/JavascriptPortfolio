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

        this.x = 0;
        this.y = 0;

        this.isDead =false;
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

        this.x = 30;
        this.y = 240/2;

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
            this.w = 14;
            this.h = 24;





        if (this.isDead == false)
        {
            //If the player is alive, use the space bar || mouse buttor to let the player soar / flap
            if ((Input.getKeystate(KEYCODE_w) === INPUT_HELD)
                ||(Input.getKeystate(KEYCODE_up_arrow) === INPUT_HELD)
            )
            {
                this.y += BomberManInst.speed;
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
                this.y -= BomberManInst.speed;
            }
        }



    }

    drawInReadyMode()
    {
        this.manFrame = 1;
        BomberManInst.DrawSprite('assets/solid.png',new Vector2(this.x,this.y) );
    }

    draw()
    {
        BomberManInst.DrawSprite('assets/solid.png',new Vector2(this.x,this.y) );

    }
}