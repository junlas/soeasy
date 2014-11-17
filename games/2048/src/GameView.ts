/**
 * Created by mebius on 14-7-22.
 */

class GameView extends egret.EventDispatcher
{
    //创建全局静态界面
    public createStaticView(rootLayout:egret.DisplayObjectContainer,res:egret.SpriteSheet):void
    {
        this.createTitleBitmap( rootLayout, res );
        this.createRectBackground( rootLayout, res );
        this.createGameOverLayout( rootLayout, res);
        this.createScoreText( rootLayout );
    }

    //创建标题界面
    private createTitleBitmap(rootLayout:egret.DisplayObjectContainer,res:egret.SpriteSheet):void
    {
        var titleBitmap:egret.Bitmap = new egret.Bitmap();
        titleBitmap.texture = res.getTexture("menu");
        titleBitmap.width = egret.MainContext.instance.stage.stageWidth;
        rootLayout.addChild( titleBitmap );
    }

    //创建盒子背景
    private createRectBackground(rootLayout:egret.DisplayObjectContainer,res:egret.SpriteSheet):void
    {
        var scale:egret.Rectangle = new egret.Rectangle(16,13,69,70);
        var bg:egret.Bitmap = new egret.Bitmap();
        bg.texture = res.getTexture("background");
        bg.width = egret.MainContext.instance.stage.stageWidth;
        bg.height = egret.MainContext.instance.stage.stageWidth;
        bg.scale9Grid = scale;
        bg.y = 105
        rootLayout.addChild( bg );

        for( var i:number = 0; i<4; i++)
        {
            for(var t:number = 0; t<4; t++)
            {
                var bit:egret.Bitmap = new egret.Bitmap();
                bit.texture = res.getTexture("backtile");
                bit.x = 10 + (10 + bit.width) * t;
                bit.y = 105 + 10 + (10 + bit.height) * i;
                rootLayout.addChild( bit );
            }
        }
    }

    private _gameOverLayout:egret.Sprite;
    private _gameOverLayoutParent:egret.DisplayObjectContainer;
    private createGameOverLayout(rootLayout:egret.DisplayObjectContainer,res:egret.SpriteSheet)
    {
        this._gameOverLayoutParent = rootLayout;

        this._gameOverLayout = new egret.Sprite();
        var img:egret.Bitmap = new egret.Bitmap();
        img.texture = res.getTexture("frontground");
        img.width = egret.MainContext.instance.stage.stageWidth;
        img.height = egret.MainContext.instance.stage.stageHeight;
        this._gameOverLayout.addChild( img );

        var btn:egret.Sprite = new egret.Sprite();

        var btnimg:egret.Bitmap = new egret.Bitmap();
        btnimg.texture = res.getTexture("continueButton_over");
        btn.addChild( btnimg );

        btn.x = ( img.width - btnimg.width )/2;
        btn.y = ( img.height - btnimg.height )/2;

        btn.width = btnimg.width;
        btn.width = btnimg.height;


        btn.touchEnabled = true;

        this._gameOverLayout.addChild( btn );
        btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onRestart, this);
    }

    //显示游戏结束画面
    public showGameOverLayout()
    {
        this._gameOverLayoutParent.addChild( this._gameOverLayout );
    }

    //
    private onRestart()
    {
        DataManage.Restart();
        this._gameOverLayoutParent.removeChild( this._gameOverLayout );

        var evt:egret.Event = new egret.Event("gameRestart");
        this.dispatchEvent(evt);
    }

    //文书文本
    private txt:egret.TextField;
    private createScoreText(rootLayout:egret.DisplayObjectContainer):void
    {
        this.txt = new egret.TextField();
        this.txt.x = 400;
        this.txt.y = 30;
        rootLayout.addChild( this.txt );
        this.updateScrore();
    }

    //更新分数
    public updateScrore()
    {
        this.txt.text = String(DataManage.score);
    }

}