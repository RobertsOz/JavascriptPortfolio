class Bomb{
    constructor(XYpos,str,owner){
        this.player=owner;
        this.lifespan=3;
        this.fps=60;
        this.frame=0;//60frames per second
        this.pixels=16;
        this.x=XYpos[0];
        this.y=XYpos[1];
        this.exploded=false;
        this.finished=false;
        this.firstExplosionFrame=true;
        this.collision= new RectCollider(this.x*this.pixels+1,this.y*this.pixels+1,this.pixels-2,this.pixels-2);
        this.fireCollision=[];

        this.broken = {
            left : 0,
            right : 0,
            up : 0,
            down : 0,
        }

        this.breakLeft=false;
        this.breakRight=false;
        this.breakUp=false;
        this.breakDown=false;
        if(str !== undefined){
            this.str=str;
        }
        else{
            this.str=1;
        }
    }
    draw(){
        //draw the bomb for 3 seconds changing the sprite every 1 second
        if(this.finished==false) {
            BomberManInst.texturePage.DrawResizedSprite("bomb_" + Math.floor(this.frame / this.fps), new Vector2(this.x * this.pixels + 1, this.y * this.pixels + 1), this.pixels - 2, this.pixels - 2);
            this.frame++;
            //if it reaches 3 seconds(lifespan) then explode the bomb
            if (Math.floor(this.frame / this.fps) >= this.lifespan) {
                this.finished = true;
            }
        }
        else if(this.finished==true && this.exploded==false){
            //while the fire is going draw the fire
            this.explode()
        }
    }
    explode(){
        let tempX=this.x;
        let tempY=this.y;
        //start of the fire will always be drawn.
        BomberManInst.texturePage.DrawSprite("startfire",new Vector2(tempX*this.pixels,tempY*this.pixels));
        for(let i=1;i<this.str+1;i++){
            if(i==this.str) {
                /*
                Draw the end of the fire
                if the fire has not already been broken before
                for the firstExplosionFrame add all of the fire collisions;
                */
                if(BomberManInst.map.checkBomb(tempX + this.str,tempY,this.breakRight,this.broken.right,i)){
                    BomberManInst.texturePage.DrawSprite("endfireright", new Vector2((tempX + this.str) * this.pixels, tempY * this.pixels));
                    if(Boolean(this.firstExplosionFrame)){
                        this.fireCollision.push(new RectCollider((tempX + this.str) * this.pixels, tempY * this.pixels,this.pixels,this.pixels));
                    }
                }
                if(BomberManInst.map.checkBomb(tempX - this.str,tempY,this.breakLeft,this.broken.left,i)){
                    BomberManInst.texturePage.DrawSprite("endfireleft", new Vector2((tempX - this.str) * this.pixels, tempY * this.pixels));
                    if(Boolean(this.firstExplosionFrame)){
                        this.fireCollision.push(new RectCollider((tempX - this.str) * this.pixels, tempY * this.pixels,this.pixels,this.pixels));
                    }
                }
                if(BomberManInst.map.checkBomb(tempX,tempY+this.str,this.breakDown,this.broken.down,i)){
                    BomberManInst.texturePage.DrawSprite("endfiredown", new Vector2(tempX * this.pixels, (tempY + this.str) * this.pixels));
                    if(Boolean(this.firstExplosionFrame)){
                        this.fireCollision.push(new RectCollider(tempX * this.pixels, (tempY + this.str) * this.pixels,this.pixels,this.pixels));
                    }
                }
                if(BomberManInst.map.checkBomb(tempX,tempY-this.str,this.breakUp,this.broken.up,i)){
                    BomberManInst.texturePage.DrawSprite("endfireup", new Vector2(tempX * this.pixels, (tempY - this.str) * this.pixels));
                    if(Boolean(this.firstExplosionFrame)){
                        this.fireCollision.push(new RectCollider(tempX * this.pixels, (tempY - this.str) * this.pixels,this.pixels,this.pixels));
                    }
                }
                if(Boolean(this.firstExplosionFrame)){//this is the end of the first loop so reset the frame count to do the timing for the fire
                    this.frame=0;
                    this.fireCollision.push(new RectCollider(this.x*this.pixels,this.y*this.pixels,this.pixels,this.pixels));
                    this.firstExplosionFrame=false;
                }
            }
            else{
                /*
                Draw the middle of the fire
                Add to the correct dictionary the count of when the fire broke
                Add the collider of the fire if it has not broken in the firstframe
                */
                if(BomberManInst.map.checkBomb(tempX + i,tempY,this.breakRight,this.broken.right,i)){//if returns false that means the fire broke and should not be drawn
                    BomberManInst.texturePage.DrawSprite("middlefireright", new Vector2((tempX + i) * this.pixels, tempY * this.pixels));
                    if(!Boolean(this.breakRight) && Boolean(this.firstExplosionFrame)) {
                        this.broken.right++;
                        this.fireCollision.push(new RectCollider((tempX + i) * this.pixels, tempY * this.pixels,this.pixels,this.pixels));
                    }
                }
                else this.breakRight=true;

                if(BomberManInst.map.checkBomb(tempX - i,tempY,this.breakLeft,this.broken.left,i)){
                    BomberManInst.texturePage.DrawSprite("middlefireleft", new Vector2((tempX - i) * this.pixels, tempY * this.pixels));
                    if(!Boolean(this.breakLeft) && Boolean(this.firstExplosionFrame)) {
                        this.broken.left++;
                        this.fireCollision.push(new RectCollider((tempX - i) * this.pixels, tempY * this.pixels,this.pixels,this.pixels));
                    }
                }
                else this.breakLeft=true;

                if(BomberManInst.map.checkBomb(tempX,tempY+i,this.breakDown,this.broken.down,i)){
                    BomberManInst.texturePage.DrawSprite("middlefiredown", new Vector2(tempX * this.pixels, (tempY + i) * this.pixels));
                    if(!Boolean(this.breakDown) && Boolean(this.firstExplosionFrame)) {
                        this.broken.down++;
                        this.fireCollision.push(new RectCollider((tempX) * this.pixels, (tempY + i) * this.pixels,this.pixels,this.pixels));
                    }
                }
                else this.breakDown=true;

                if(BomberManInst.map.checkBomb(tempX,tempY-i,this.breakUp,this.broken.up,i)){
                    BomberManInst.texturePage.DrawSprite("middlefireup", new Vector2(tempX * this.pixels, (tempY - i) * this.pixels))
                    if(!Boolean(this.breakUp) && Boolean(this.firstExplosionFrame)){
                        this.broken.up++
                        this.fireCollision.push(new RectCollider((tempX) * this.pixels, (tempY - i) * this.pixels,this.pixels,this.pixels));
                    }
                }
                else this.breakUp=true;

            }
        }
        this.frame++;//frame was set back to 0 when fire started so stop the fire after 30 frames and end the bomb
        if(this.frame>30){
            this.exploded=true;
        }
    }
}