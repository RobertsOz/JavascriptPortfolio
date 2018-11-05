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
    getTilePosition(x,y){
        let tileXpos = Math.floor(x/this.pixels);
        let tileYpos = Math.floor(y/this.pixels);
        return [tileXpos,tileYpos];
    }
    getCollidersAround(positionXY){
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
        if(this.mapLayout[positionXY[1]-1][positionXY[0]].hasCollision){
            return true;
        }
        else{
            return false;
        }
    }
    checkBomb(x,y,brk){
        if(x>=0 && y>0 && x<this.w && y<this.h){
            if (brk==false){
                if(this.mapLayout[y][x].tile == "grass"){
                    return true;
                }
                else if(this.mapLayout[y][x].tile == "solid"){
                    return false;
                }
                else if(this.mapLayout[y][x].tile == "block"){
                    this.mapLayout[y][x].tile = "grass";
                    this.mapLayout[y][x].hasCollision=false;
                    return false;
                }
            }
            return false;
        }
    }

}