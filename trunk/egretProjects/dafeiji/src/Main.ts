/**
 * Copyright (c) 2014,Egret-Labs.org
 * All rights reserved.
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the Egret-Labs.org nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY EGRET-LABS.ORG AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL EGRET-LABS.ORG AND CONTRIBUTORS BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

class Main extends egret.DisplayObjectContainer{

    /**
     * 加载进度界面
     */
    private loadingView:LoadingUI;

    public static instance:Main;

    public constructor() {
        super();
        Main.instance = this;
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
    }

    private onAddToStage(event:egret.Event){
        //设置加载进度界面
        this.loadingView  = new LoadingUI();
        this.stage.addChild(this.loadingView);

        //初始化Resource资源加载库
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE,this.onConfigComplete,this);
        RES.loadConfig("resource/resource.json","resource/");
    }
    /**
     * 配置文件加载完成,开始预加载preload资源组。
     */
    private onConfigComplete(event:RES.ResourceEvent):void{
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE,this.onConfigComplete,this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.onResourceLoadComplete,this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS,this.onResourceProgress,this);
        RES.loadGroup("preload");
    }
    /**
     * preload资源组加载完成
     */
    private onResourceLoadComplete(event:RES.ResourceEvent):void {
        if(event.groupName=="preload"){
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.onResourceLoadComplete,this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS,this.onResourceProgress,this);
            this.createGameScene();
        }
    }
    /**
     * preload资源组加载进度
     */
    private onResourceProgress(event:RES.ResourceEvent):void {
        if(event.groupName=="preload"){
            this.loadingView.setProgress(event.itemsLoaded,event.itemsTotal);
        }
    }

    private hero:Hero;
    /**
     * 创建游戏场景
     */
    private createGameScene():void{
        egret.Profiler.getInstance().run();
        egret.Ticker.getInstance().register(this.onEnterFrame, this);

        var bg:egret.Bitmap = new egret.Bitmap(RES.getRes("bg"));
        bg.width = CONST.stageWidth;
        bg.height = CONST.stageHeight;
        this.addChild(bg);

        this.hero = <Hero>ObjectPool.getInstance().createObject(Hero);
        this.addChild(this.hero.view);

        this.stage.touchChildren = false;
        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        this.stage.addEventListener(egret.Event.LEAVE_STAGE, this.onTouchEnd, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
    }

    private _isTouching:boolean;

    private onTouchBegin(event:egret.TouchEvent):void {
        this._isTouching = true;
        this._preMoveX = event.stageX;
        this._preMoveY = event.stageY;
    }

    private onTouchEnd(event:egret.TouchEvent):void {
        this._isTouching = false;
    }

    private _preMoveX:number;
    private _preMoveY:number;
    private onTouchMove(event:egret.TouchEvent):void {
        if(this._isTouching) {
            this.hero.moveXY(event.stageX - this._preMoveX, event.stageY - this._preMoveY);
        }
        this._preMoveX = event.stageX;
        this._preMoveY = event.stageY;
    }

    private _time:number = 0;
    public onEnterFrame(advancedTime:number):void {
        this._time += advancedTime;
        //创建敌人
        if(this._time > CONST.enemyGap){
            this._time = 0;
            var enemy = ObjectPool.getInstance().createObject(Enemy);
            enemy.view.x = Math.random() * (CONST.stageWidth - 80);
            this.addChild(enemy.view);
        }
    }
}


