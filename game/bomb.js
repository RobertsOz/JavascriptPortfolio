class Bomb{
    constructor(XYpos,str){
        this.lifespan=3;
        this.fps=60;
        this.frame=0;//60frames per second
        this.pixels=16;
        this.x=XYpos[0];
        this.y=XYpos[1];
        this.exploded=false;
        this.finished=false;
        this.collision= new RectCollider();
        this.collision.w=this.pixels-2;
        this.collision.h=this.pixels-2;
        this.collision.x=this.x*this.pixels+1;
        this.collision.y=this.y*this.pixels+1;
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
        if(this.finished==false){
            BomberManInst.texturePage.DrawSprite("bomb_"+Math.floor(this.frame/this.fps),new Vector2(this.x*this.pixels,this.y*this.pixels));
            this.frame++;
            if(Math.floor(this.frame/this.fps) === this.lifespan){
                this.finished=true;
                this.frame=0;
            }
        }
        else if(this.finished==true && this.exploded==false){
            this.explode()
        }
    }
    explode(){
        let tempX=this.x;
        let tempY=this.y;
        BomberManInst.texturePage.DrawSprite("startfire",new Vector2(tempX*this.pixels,tempY*this.pixels));
        for(let i=1;i<this.str+1;i++){
            if(i==this.str) {
                if(BomberManInst.map.checkBomb(tempX + this.str,tempY,this.breakRight)){
                    BomberManInst.texturePage.DrawSprite("endfireright", new Vector2((tempX + this.str) * this.pixels, tempY * this.pixels));
                }
                if(BomberManInst.map.checkBomb(tempX - this.str,tempY,this.breakLeft)){
                    BomberManInst.texturePage.DrawSprite("endfireleft", new Vector2((tempX - this.str) * this.pixels, tempY * this.pixels));
                }
                if(BomberManInst.map.checkBomb(tempX,tempY+this.str,this.breakDown)){
                    BomberManInst.texturePage.DrawSprite("endfiredown", new Vector2(tempX * this.pixels, (tempY + this.str) * this.pixels));
                }
                if(BomberManInst.map.checkBomb(tempX,tempY-this.str,this.breakUp)){
                    BomberManInst.texturePage.DrawSprite("endfireup", new Vector2(tempX * this.pixels, (tempY - this.str) * this.pixels));
                }
            }
            else{
                if(BomberManInst.map.checkBomb(tempX + i,tempY,this.breakRight)){
                    BomberManInst.texturePage.DrawSprite("middlefireright", new Vector2((tempX + i) * this.pixels, tempY * this.pixels));
                }
                if(BomberManInst.map.checkBomb(tempX - i,tempY,this.breakLeft)){
                    BomberManInst.texturePage.DrawSprite("middlefireleft", new Vector2((tempX - i) * this.pixels, tempY * this.pixels));
                }
                if(BomberManInst.map.checkBomb(tempX,tempY+i,this.breakDown)){
                    BomberManInst.texturePage.DrawSprite("middlefiredown", new Vector2(tempX * this.pixels, (tempY + i) * this.pixels));
                }
                if(BomberManInst.map.checkBomb(tempX,tempY-i,this.breakUp)){
                    BomberManInst.texturePage.DrawSprite("middlefireup", new Vector2(tempX * this.pixels, (tempY - i) * this.pixels));
                }

            }
        }
        this.frame++;
        if(this.frame>30){
            this.exploded=true;
        }
    }
}