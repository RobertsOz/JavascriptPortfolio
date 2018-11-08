class Upgrade{
    constructor(name,x,y){
        this.upgrade = name;
        this.x=x;
        this.y=y;
        this.isDone=false;
        this.immune=true;
        this.lifespan=10;
        this.frame=0;
        this.fps=60;
        this.pixels=10;
        this.collision = new RectCollider(this.x*16+3,this.y*16+3,this.pixels,this.pixels)
    }
    draw()
    {
        if(this.isDone==false){
            BomberManInst.texturePage.DrawResizedSprite(this.upgrade,new Vector2(this.x*16+3,this.y*16+3),this.pixels,this.pixels);
            this.frame++;
            if(Math.floor(this.frame/this.fps) === this.lifespan){
                this.isDone=true;
            }
            if(this.frame>40){
                this.immune=false;
            }
        }
    }
}