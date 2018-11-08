/*
    TexturePage - Texture Page image and associated metadata
    
    MetaData is stored in TexturePageMetaData and is expected to be a .js file / src code
 */

class TexturePageMetaData
{
    constructor()
    {
        this.lookup = {};
    }
}

class TexturePage
{
    constructor(filename, metadata)
    {
        this.image = new Image();
        this.image.src = filename;
        this.metadata = metadata;
    }
    
    /*
        DrawSprite(string name, vector2 pos)
        
        Draw a sprite named 'name' from the metadata at position
     */
    
    DrawSprite(name, pos)
    {
        this.DrawSpriteInfo(this.metadata.lookup[name], pos); //changed to work with multiple texture pages
    }
    
    /*
        DrawSpriteInfo(Rect uvRect, Vector2 pos)
        
        Use uVRect info to draw sprite
     */
    
    DrawSpriteInfo(uvRect, pos)
    {

        GAZCanvas.Sprite(this.image, new Rect(pos.x, pos.y, uvRect.w+0.5, uvRect.h+0.5), uvRect);

    }

    //Added a way to draw a Sprite that can the size you choose
    DrawResizedSprite(name,pos,w,h){
        this.DrawResizedSpriteInfo(this.metadata.lookup[name], pos,w,h);
    }
    DrawResizedSpriteInfo(uvRect,pos,w,h){
        GAZCanvas.Sprite(this.image, new Rect(pos.x, pos.y, w, h), uvRect);
    }
}