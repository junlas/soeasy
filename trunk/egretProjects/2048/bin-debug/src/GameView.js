/**
 * Created by mebius on 14-7-22.
 */
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var GameView = (function (_super) {
    __extends(GameView, _super);
    function GameView() {
        _super.apply(this, arguments);
    }
    //创建全局静态界面
    GameView.prototype.createStaticView = function (rootLayout, res) {
        this.createTitleBitmap(rootLayout, res);
        this.createRectBackground(rootLayout, res);
        this.createGameOverLayout(rootLayout, res);
        this.createScoreText(rootLayout);
    };
    //创建标题界面
    GameView.prototype.createTitleBitmap = function (rootLayout, res) {
        var titleBitmap = new egret.Bitmap();
        titleBitmap.texture = res.getTexture("menu");
        titleBitmap.width = egret.MainContext.instance.stage.stageWidth;
        rootLayout.addChild(titleBitmap);
    };
    //创建盒子背景
    GameView.prototype.createRectBackground = function (rootLayout, res) {
        var scale = new egret.Rectangle(16, 13, 69, 70);
        var bg = new egret.Bitmap();
        bg.texture = res.getTexture("background");
        bg.width = egret.MainContext.instance.stage.stageWidth;
        bg.height = egret.MainContext.instance.stage.stageWidth;
        bg.scale9Grid = scale;
        bg.y = 105;
        rootLayout.addChild(bg);
        for (var i = 0; i < 4; i++) {
            for (var t = 0; t < 4; t++) {
                var bit = new egret.Bitmap();
                bit.texture = res.getTexture("backtile");
                bit.x = 10 + (10 + bit.width) * t;
                bit.y = 105 + 10 + (10 + bit.height) * i;
                rootLayout.addChild(bit);
            }
        }
    };
    GameView.prototype.createGameOverLayout = function (rootLayout, res) {
        this._gameOverLayoutParent = rootLayout;
        this._gameOverLayout = new egret.Sprite();
        var img = new egret.Bitmap();
        img.texture = res.getTexture("frontground");
        img.width = egret.MainContext.instance.stage.stageWidth;
        img.height = egret.MainContext.instance.stage.stageHeight;
        this._gameOverLayout.addChild(img);
        var btn = new egret.Sprite();
        var btnimg = new egret.Bitmap();
        btnimg.texture = res.getTexture("continueButton_over");
        btn.addChild(btnimg);
        btn.x = (img.width - btnimg.width) / 2;
        btn.y = (img.height - btnimg.height) / 2;
        btn.width = btnimg.width;
        btn.width = btnimg.height;
        btn.touchEnabled = true;
        this._gameOverLayout.addChild(btn);
        btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRestart, this);
    };
    //显示游戏结束画面
    GameView.prototype.showGameOverLayout = function () {
        this._gameOverLayoutParent.addChild(this._gameOverLayout);
    };
    //
    GameView.prototype.onRestart = function () {
        DataManage.Restart();
        this._gameOverLayoutParent.removeChild(this._gameOverLayout);
        var evt = new egret.Event("gameRestart");
        this.dispatchEvent(evt);
    };
    GameView.prototype.createScoreText = function (rootLayout) {
        this.txt = new egret.TextField();
        this.txt.x = 400;
        this.txt.y = 30;
        rootLayout.addChild(this.txt);
        this.updateScrore();
    };
    //更新分数
    GameView.prototype.updateScrore = function () {
        this.txt.text = String(DataManage.score);
    };
    return GameView;
})(egret.EventDispatcher);
