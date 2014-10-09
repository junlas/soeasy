/**
 * Created by mebius on 14-7-22.
 */

class Game extends egret.DisplayObjectContainer
{
    public constructor ()
    {
        super();
        this.addEventListener( egret.Event.ADDED_TO_STAGE, this.onAddStage,this);
    }

    private onAddStage():void
    {
        egret.Profiler.getInstance().run();

        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.onGroupComp,this);
        RES.loadConfig("resource/resource.json","resource/");
        RES.loadGroup("gameres");
    }

    private gameView:GameView;      //游戏视图
    private res:egret.SpriteSheet;  //资源 纹理集
    private gameLayout:egret.Sprite; //游戏层
    private eventManage:EventManage;  //事件管理器
    private _time:egret.Timer ;      //操作计时器
    //加载完成
    private onGroupComp()
    {

        //生成纹理集
        this.res = RES.getRes("res_json");
        //创建游戏静态界面
        this.gameView = new GameView();
        this.gameView.createStaticView( this, this.res );
        this.gameView.addEventListener("gameRestart",this.onRestart,this);
        //创建游戏层
        this.gameLayout = new egret.Sprite();
        this.gameLayout.y = 105;
        this.addChild( this.gameLayout );
        //计时器
        this._time = new egret.Timer(110,1);
        this._time.addEventListener(egret.TimerEvent.TIMER,this.onTimerComplete,this);
        //初始化游戏数据
        DataManage.createAllRect( this.res );
        //创建两个新方块
        this.createNewRect();
        this.createNewRect();
        //添加事件管理
        this.eventManage = new EventManage();
        this.eventManage.addEvent();
        this.eventManage.addEventListener("keyDowns",this.keyDowns,this);
    }

    //创建一个新方块
    private createNewRect()
    {

        //寻找一个未使用的位置
        var pos = DataManage.selectNewPos();
        //寻找一个新方块
        var rect = DataManage.selectNewRect();
        //更新盒子的状态
        rect.isUsed = true;
        rect.num = 2;
        rect.row = pos.x;
        rect.column = pos.y;
        var rectpost = Util.getPosByRect(rect);
        rect.x = rectpost.x;
        rect.y = rectpost.y;
        DataManage.addNewRectToDatas( rect );
        this.gameLayout.addChild( rect );
    }

    //键盘按下，或者移动事件发生
    private keyDowns():void
    {
        this.gameView.updateScrore();
        //判断是否游戏结束
        if( DataManage.isGameOver() )
        {
            console.log("游戏结束");//弹出结束面板
            this.gameView.showGameOverLayout();
        }
        else
        {
            this._time.start();
        }
    }

    //计时器完成
    private onTimerComplete():void
    {
        DataManage.isRunning = true;
        if(DataManage._nousedata.length!=0 && DataManage.isHaveMoveRect==true )
        {
            DataManage.isHaveMoveRect = false;
            this.createNewRect();
        }
    }

    //重新开始游戏
    private onRestart()
    {
        this.gameView.updateScrore();
        this.createNewRect();
        this.createNewRect();
    }


}