var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var HelloWorld = (function (_super) {
    __extends(HelloWorld, _super);
    function HelloWorld() {
        _super.call(this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    HelloWorld.prototype.onAddToStage = function (event) {
        egret.Profiler.getInstance().run();
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComp, this);
        RES.loadConfig("resource/resource.json", "resource/");
    };
    HelloWorld.prototype.onConfigComp = function (event) {
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onGroupComp, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onGroupProg, this);
        RES.loadGroup("preload");
    };
    HelloWorld.prototype.onGroupComp = function (e) {
        console.log("加载完成..");
        var bgImage = RES.getRes("bgImage");
        var bgBitmap = new egret.Bitmap();
        bgBitmap.texture = bgImage;
        this.addChild(bgBitmap);
        var preloadArr = RES.getGroupByName("preload");
    };
    HelloWorld.prototype.onGroupProg = function (e) {
        if (e.groupName == "preload") {
            console.log(e.itemsLoaded, e.itemsTotal);
        }
    };
    return HelloWorld;
})(egret.DisplayObjectContainer);
