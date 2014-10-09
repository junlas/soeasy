var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
 * Created by mebius on 14-7-22.
 */
var EventManage = (function (_super) {
    __extends(EventManage, _super);
    function EventManage() {
        _super.apply(this, arguments);
    }
    //添加事件侦听
    EventManage.prototype.addEvent = function () {
        //判断是否是移动设备
        if (egret.MainContext.deviceType == egret.MainContext.DEVICE_MOBILE) {
            egret.MainContext.instance.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.mouseDownHandle, this);
        }
        else {
            //js 的函数闭包
            var self = this;
            document.addEventListener("keydown", function (evt) {
                switch (evt.keyCode) {
                    case 38:
                        self.doMove(0); //shang
                        break;
                    case 39:
                        self.doMove(1); //you
                        break;
                    case 40:
                        self.doMove(2); //xia
                        break;
                    case 37:
                        self.doMove(3); //zuo
                        break;
                }
            });
        }
    };
    //鼠标按下
    EventManage.prototype.mouseDownHandle = function (event) {
        console.log("touchdown");
        egret.MainContext.instance.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.stage_mouseMoveHandler, this);
        egret.MainContext.instance.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.stage_mouseUpHandler, this);
        egret.MainContext.instance.stage.addEventListener(egret.Event.LEAVE_STAGE, this.stage_mouseUpHandler, this);
        this.downPoint = new egret.Point(event.stageX, event.stageY);
    };
    //鼠标移动
    EventManage.prototype.stage_mouseMoveHandler = function (event) {
        if (!this.movePoint) {
            this.movePoint = new egret.Point();
        }
        this.movePoint.x = event.stageX;
        this.movePoint.y = event.stageY;
        if (this.needMove)
            return;
        this.needMove = true;
    };
    //鼠标抬起
    EventManage.prototype.stage_mouseUpHandler = function (event) {
        egret.MainContext.instance.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.stage_mouseMoveHandler, this);
        egret.MainContext.instance.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.stage_mouseUpHandler, this);
        egret.MainContext.instance.stage.addEventListener(egret.Event.LEAVE_STAGE, this.stage_mouseUpHandler, this);
        if (this.needMove) {
            this.updateWhenMouseUp();
            this.needMove = false;
        }
    };
    /**
     * 移动设备上，判断移动方向
     */
    EventManage.prototype.updateWhenMouseUp = function () {
        var p = this.movePoint;
        var offSetX = p.x - this.downPoint.x;
        var offSetY = p.y - this.downPoint.y;
        if (offSetY < 0 && Math.abs(offSetY) > Math.abs(offSetX)) {
            this.doMove(0);
        }
        else if (offSetX > 0 && offSetX > Math.abs(offSetY)) {
            this.doMove(1);
        }
        else if (offSetY > 0 && offSetY > Math.abs(offSetX)) {
            this.doMove(2);
        }
        else if (offSetX < 0 && Math.abs(offSetX) > Math.abs(offSetY)) {
            this.doMove(3);
        }
    };
    //移动盒子
    EventManage.prototype.doMove = function (direction) {
        //    console.log( "案件编码" );
        if (DataManage.isRunning) {
            DataManage.isRunning = false;
            switch (direction) {
                case 0:
                    DataManage.shang();
                    break;
                case 1:
                    DataManage.you();
                    break;
                case 2:
                    DataManage.xia();
                    break;
                case 3:
                    DataManage.zuo();
                    break;
            }
            var evt = new egret.Event("keyDowns");
            this.dispatchEvent(evt);
        }
    };
    return EventManage;
})(egret.EventDispatcher);
