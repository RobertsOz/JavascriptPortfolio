class RectCollider extends Rect
{
    /*
        RectCollider - AABB 2D rectangle
     */
    constructor(x,y,w,h)
    {
        super();
        this.x=x;
        this.y=y;
        this.w=w;
        this.h=h;
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

        if ((this.y <= (collider.y + collider.h)) && (this.y >= collider.y) && this.dy<0 && topCalc>=-this.speed){
            return "top";
        }
        if (((this.y +this.h) >= collider.y) && ((this.y +this.h) <= (collider.y+collider.h)) && this.dy>0 && bottomCalc<=this.speed) {
            return "bottom";
        }
        if ((this.x >= collider.x) && (this.x <= (collider.x+collider.w)) && this.dx<0 && leftCalc >=-this.speed) {
            return "left";
        }
        if ((this.x+this.w <=collider.x+collider.h) && (this.x+this.w >=collider.x) && this.dx>0 && rightCalc <=this.speed) {
            return "right";
        }
        return true;
    }
}