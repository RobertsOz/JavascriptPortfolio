class Map
{
    constructor() {
        this.mapLayout =[[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                         [1, 0, 0, 2, 9, 9, 9, 9, 9, 9, 9, 2, 0, 0, 1],
                         [1, 0, 1, 9, 1, 9, 1, 9, 1, 9, 1, 9, 1, 0, 1],
                         [1, 2, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 2, 1],
                         [1, 9, 1, 9, 1, 9, 1, 9, 1, 9, 1, 9, 1, 9, 1],
                         [1, 9, 9, 9, 9, 9, 2, 2, 2, 9, 9, 9, 9, 9, 1],
                         [1, 9, 1, 9, 1, 9, 1, 9, 1, 9, 1, 9, 1, 9, 1],
                         [1, 9, 9, 9, 9, 9, 2, 2, 2, 9, 9, 9, 9, 9, 1],
                         [1, 9, 1, 9, 1, 9, 1, 9, 1, 9, 1, 9, 1, 9, 1],
                         [1, 2, 9, 9, 9, 9, 0, 9, 9, 9, 9, 9, 9, 2, 1],
                         [1, 0, 1, 9, 1, 9, 1, 9, 1, 9, 1, 9, 1, 0, 1],
                         [1, 0, 0, 2, 9, 9, 9, 9, 9, 9, 9, 2, 0, 0, 1],
                         [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]];
        this.w = 15;
        this.h = 13;
        this.pixels=16;
        for (let y=0;y<this.h;y++)
        {
            for (let x=0;x<this.w;x++){
                let tileID=this.mapLayout[y][x];
                this.mapLayout[y][x]= new Tile(tileID,x,y);
            }
        }
    }
    draw(){
        for (let y=0;y<this.h;y++)
        {
            for (let x=0;x<this.w;x++){
                this.mapLayout[y][x].drawTile();
            }
        }
    }
    setTile(x,y,newTile){
        this.mapLayout[y][x] = newTile;
    }
    getTile(x,y){
        return this.mapLayout[y][x];
    }
    getTilePosition(x,y){//transform a point on the map into the tile position on the map
        let tileXpos = Math.floor(x/this.pixels);
        let tileYpos = Math.floor(y/this.pixels);
        return [tileXpos,tileYpos];
    }
    getCollidersAround(positionXY){//Get all tiles with collission around the specified tile
        let xPos = positionXY[0];
        let yPos = positionXY[1];
        let firstX= xPos-1;
        let firstY= yPos-1;
        let loopLenght=9;
        let countX = 0;
        let countY = 0;
        let Colliders = [];
        for(let i=0; i<loopLenght;i++){
            let currentX=firstX+countX;
            let currentY=firstY+countY;
            try{
                if (this.mapLayout[currentY][currentX].hasCollision ==true){
                    Colliders.push(this.mapLayout[currentY][currentX].collision);
                }
            }catch(e){
                console.log("value not in array",e)
            }
            if (countX<2){
                countX++;
            }
            else{
                countX=0;
                countY++;
            }
        }
        return Colliders;
    }
    shouldCollideTop(positionXY){
        /*
        Check if you should be colliding with the top of a tile
        If a player is running left and up against a wall, the up collision will register first
        ,but if there is no tile above the player that collision should be ignored
        */
        try{
            if(this.mapLayout[positionXY[1]-1][positionXY[0]].hasCollision){
                return true;
            }
            else{
                return false;
            }
        }
        catch(e){
            console.log("shouldCollideTop Failed",e)
            return false;
        }

    }
    checkBomb(x,y,brk,brkcount,i){
        /*
        Check if a fire destroys something or it collides with something then
        if has already collided before the fire should not be drawn.
        */
        if(x>=0 && y>0 && x<this.w && y<this.h){
            if (brk==false){
                if(this.mapLayout[y][x].tile == "grass"){
                    return true;
                }
                else if(this.mapLayout[y][x].tile == "solid"){
                    return false;
                }
                else if(this.mapLayout[y][x].tile == "block"){
                    let random = Math.floor(Math.random() * 6) + 1; // random between 1-6
                    if(random>3){                                   //50%
                        BomberManInst.upgradeList.push(new Upgrade(BomberManInst.upgrades[Math.floor(Math.random()*4)],x,y));
                    }
                    this.mapLayout[y][x]= new Tile(0,x,y);
                    return false;
                }
            }
            else if(i<=brkcount+1){
                if(this.mapLayout[y][x].tile == "grass"){
                    return true;
                }
                else if(this.mapLayout[y][x].tile == "solid"){
                    return false;
                }
                else{
                    return false;
                }
            }
        }
        return false;
    }

}