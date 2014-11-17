var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Bullet = (function (_super) {
    __extends(Bullet, _super);
    function Bullet() {
        _super.call(this);
        this.view = new egret.Bitmap(RES.getRes("bullet"));
    }
    Bullet.prototype.onCreate = function () {
    };
    Bullet.prototype.onDestroy = function () {
        if (this.view && this.view.parent) {
            this.view.parent.removeChild(this.view);
        }
    };
    Bullet.prototype.onEnterFrame = function (advancedTime) {
        this.view.y -= advancedTime / 5;
        if (this.view.y < 0) {
            ObjectPool.getInstance().destroyObject(this);
        }
    };
    Bullet.key = "bullet";
    return Bullet;
})(GameObject);
