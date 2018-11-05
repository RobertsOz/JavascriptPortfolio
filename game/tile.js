class Tile {
    constructor(id,x,y){
        this.pixels = 16;
        this.id=id;
        this.x=x;
        this.y=y;
        if(this.id==0){
            this.tile="grass";
            this.hasCollision=false;
        }
        else if(this.id==1){
            this.tile="solid";
            this.hasCollision=true;
        }
        else if(this.id==2){
            this.tile="block";
            this.hasCollision=true;
        }
        else if(this.id==9){
            let random = Math.floor(Math.random() * 6) + 1; // random between 1-6
            if (random <3){                                 //33% to be grass
                this.tile="grass";
                this.hasCollision=false;
            }
            else{
                this.tile="block";
                this.hasCollision=true;
            }
        }


        if(Boolean(this.hasCollision)){
            this.collision= new RectCollider();
            this.collision.w=this.pixels;
            this.collision.h=this.pixels;
            this.collision.x=x*this.pixels;
            this.collision.y=y*this.pixels;
        }
    }
    drawTile(){
        BomberManInst.texturePage.DrawSprite(this.tile,new Vector2(this.x*this.pixels,this.y*this.pixels));
    }
}