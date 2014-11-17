class Bullet extends GameObject {
    public static key:string = "bullet";

    constructor() {
        super();
        this.view = new egret.Bitmap(RES.getRes("bullet"));
    }

    public onCreate():void {

    }

    public onDestroy():void {
        if (this.view && this.view.parent) {
            this.view.parent.removeChild(this.view);
        }
    }

    public onEnterFrame(advancedTime:number):void {
        this.view.y -= advancedTime / 5;

        if (this.view.y < 0) {
            ObjectPool.getInstance().destroyObject(this);
        }
    }
}