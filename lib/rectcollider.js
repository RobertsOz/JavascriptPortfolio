class RectCollider extends Rect
{
    /*
        RectCollider - AABB 2D rectangle
     */
    constructor()
    {
        super();
    }
    
    setPosition(position)
    {
        this.x = position.x;
        this.y = position.y;
    }
    
    /*
        collides(RectCollider collider)
        
        Does this collide with RectCollider?
    */
    collides(collider)
    {
        //left
        if (this.x >= (collider.x + collider.w)) return false;
        //top
        if (this.y >= (collider.y + collider.h)) return false;
        //right
        if ((this.x + this.w) <= collider.x) return false;
        //bottom
        if ((this.y + this.h) <= collider.y) return false;

        let topCalc = this.y - (collider.y + collider.h);
        let bottomCalc = (this.y+this.h) - collider.y;
        let leftCalc = this.x - (collider.x+collider.w);
        let rightCalc = (this.x + this.w) - collider.x;

        if ((this.y <= (collider.y + collider.h)) && (this.y >= collider.y) && this.dy<0 && topCalc==-BomberManInst.player.speed){
            return "top";
        }
        if (((this.y +this.h) >= collider.y) && ((this.y +this.h) <= (collider.y+collider.h)) && this.dy>0 && bottomCalc==BomberManInst.player.speed) {
            return "bottom";
        }
        if ((this.x >= collider.x) && (this.x <= (collider.x+collider.w)) && this.dx<0 && leftCalc ==-BomberManInst.player.speed) {
            return "left";
        }
        if ((this.x+this.w <=collider.x+collider.h) && (this.x+this.w >=collider.x) && this.dx>0 && rightCalc ==BomberManInst.player.speed) {
            return "right";
        }
        return true;
    }
}