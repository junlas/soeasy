class HelloWorld extends egret.DisplayObjectContainer {
	
	public constructor(){
		super();
		this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
	}
	
	private onAddToStage(event:egret.Event){
		egret.Profiler.getInstance().run();

        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE,this.onConfigComp,this);
        RES.loadConfig("resource/resource.json","resource/");
	}

    private onConfigComp(event:egret.Event):void {

        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.onGroupComp,this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS,this.onGroupProg,this);
        RES.loadGroup("preload");
    }

    private onGroupComp(e:RES.ResourceEvent):void {
        console.log("加载完成..");
        var bgImage:egret.Texture = RES.getRes("bgImage");
        var bgBitmap:egret.Bitmap = new egret.Bitmap();
        bgBitmap.texture = bgImage;
        this.addChild(bgBitmap);

        var preloadArr:RES.ResourceItem[] = RES.getGroupByName("preload");
        var resItem:RES.ResourceItem = preloadArr[1];
        //RES.getResAsync(resItem.name,);

    }

    private onGroupProg(e:RES.ResourceEvent):void {
        if(e.groupName =="preload"){
            console.log(e.itemsLoaded,e.itemsTotal);
        }
    }

}