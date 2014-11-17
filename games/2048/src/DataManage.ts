/**
 * Created by mebius on 14-7-22.
 */
class DataManage
{
    public static _rects:Array<any> = [];  //所有的盒子
    public static _data:Array<any> = [];   //所有的数据
    public static _nousedata:Array<any> = [];  //位数用的数据
    public static isRunning:boolean = true;   //是否运行中

    public static score:number = 0;   //分数

    //创建所有的方块
    public static createAllRect(res:egret.SpriteSheet):void
    {
        for(var i:number=0; i<16; i++)
        {
            var rect:NewRect = new NewRect();
            rect.textures = res;
            DataManage._rects[i] = rect;
            DataManage._data[i] = 0;
            DataManage._nousedata[i] = i;
        }
    }

    //找一个未使用的方块
    public static selectNewRect():NewRect
    {
        for( var i:number=0; i<16; i++ )
        {
            if( DataManage._rects[i].isUsed == false )
            {
                return DataManage._rects[i];
            }
        }
        return null;
    }

    //重新开始游戏
    public static Restart()
    {
        this.score = 0;
        this.isRunning = true;
        for(var i:number=0; i<16; i++)
        {
            DataManage._data[i] = 0;
            DataManage._rects[i].restart();
        }
        this.restartAllRect();
    }

    //添加一个新的方块
    public static  addNewRectToDatas(rect:NewRect)
    {
        var index:number = Util.getIndexByLineRow( rect.row, rect.column );
        DataManage._data[ index ] = rect;
        DataManage.restartAllRect( );
    }

    //选择一个新的方块
    public static  selectNewPos():egret.Point
    {
        var index:number = DataManage._nousedata[ Math.floor(DataManage._nousedata.length * Math.random()) ];
        return Util.getPosByIndex(index);
    }

    //重置所有方块
    public static restartAllRect()
    {
        DataManage._nousedata = [];
        for( var i:number=1; i<16; i++)
        {
            if(DataManage._data[i]==0)
            {
                DataManage._nousedata.push(i);
            }
        }
    }

    //上
    public static shang()
    {
        var ar:Array<any> = DataManage.selectArr(0);
    //    console.log(ar);
        for( var i:number=0;i<4;i++ )
        {
            DataManage.moveArr(ar[i]);
            DataManage.unite( ar[i] );
            DataManage.moveArr(ar[i]);
        }
        DataManage.restartAllRect( );
        DataManage.playAllRect();
    }

    //下
    public static xia()
    {
        var ar:Array<any> = DataManage.selectArr(0);
        for( var i:number=0;i<4;i++ )
        {
            ar[i] = ar[i].reverse();
            DataManage.moveArr(ar[i]);
            DataManage.unite( ar[i] );
            DataManage.moveArr(ar[i]);
        }
        DataManage.restartAllRect( );
        DataManage.playAllRect();
    }

    //左侧
    public static zuo()
    {
        var ar:Array<any> = DataManage.selectArr(1);
        for( var i:number=0;i<4;i++ )
        {
            DataManage.moveArr(ar[i]);
            DataManage.unite( ar[i] );
            DataManage.moveArr(ar[i]);
        }
        DataManage.restartAllRect( );
        DataManage.playAllRect();
    }

    //右侧
    public static you()
    {
        var ar:Array<any> = DataManage.selectArr(1);
        for( var i:number=0;i<4;i++ )
        {
            ar[i] = ar[i].reverse();
            DataManage.moveArr(ar[i]);
            DataManage.unite( ar[i] );
            DataManage.moveArr(ar[i]);
        }
        DataManage.restartAllRect( );
        DataManage.playAllRect();
    }

    //判断游戏是否结束
    public static isGameOver():boolean
    {
        var rel:boolean = true;

        var ar:Array<any> = DataManage.selectArr(0);
        for( var i:number=0;i<ar.length;i++)
        {
            for( var t:number=0;t<3;t++)
            {
                if( DataManage._data[ar[i][t]].num == DataManage._data[ar[i][t+1]].num )
                {
                    rel = false;
                }
            }
        }
        ar = DataManage.selectArr(1);
        for( var i:number=0;i<ar.length;i++)
        {
            for( var t:number=0;t<3;t++)
            {
                if( DataManage._data[ar[i][t]].num == DataManage._data[ar[i][t+1]].num )
                {
                    rel = false;
                }
            }
        }
        return rel;
    }

    //移动方块,val是一个1维数组
    private static moveArr(val:Array<number>)
    {
        var karr:Array<any> = [];

        for( var i:number=0;i<val.length;i++ )
        {
            if( DataManage._data[val[i]] != 0 )
            {
                karr.push( DataManage._data[val[i]] );
            }
        }

        for( var t:number =0;t<4;t++ )
        {
            if( karr[t] )
            {
                DataManage._data[val[t]] = karr[t];
                var pos:egret.Point = Util.getPosByIndex( val[t] );
                DataManage._data[val[t]].row = pos.x;
                DataManage._data[val[t]].column = pos.y;
            }
            else
            {
                DataManage._data[val[t]] = 0;
            }
        }

        /*
        var len:number = val.length -1;
        for( var startindex:number=0;startindex<len;startindex++)
        {
            for( var i:number=0;i<len;i++)
            {
                if( DataManage._data[val[i]] == 0 && DataManage._data[val[i+1]] != 0 )
                {
                    DataManage._data[val[i]] = DataManage._data[val[i+1]];
                    var pos:egret.Point = Util.getPosByIndex( val[i] );
                    DataManage._data[val[i]].line = pos.x;
                    DataManage._data[val[i]].row = pos.y;
                    DataManage._data[val[i+1]] = 0;
                }
            }
        }*/
    }

    //0纵向,1横向,返回二维数组
    private static selectArr(dir:number):Array<any>
    {
        var arr:Array<any>=[];
        for( var i:number=0;i<4;i++ )
        {
            var ar:Array<any> = [];
            for( var t:number=0;t<4;t++)
            {
                if( dir == 0 )
                {
                    ar.push( Util.getIndexByLineRow(t,i) );
                }
                else
                {
                    ar.push( Util.getIndexByLineRow(i,t) );
                }
            }
            arr.push(ar);
        }
        return arr;
    }

    //合并
    private static unite( val:Array<any> )
    {
        var len:number = val.length - 1;
        for( var i:number=0;i<len;i++)
        {
            if( DataManage._data[val[i]].num == DataManage._data[val[i+1]].num && DataManage._data[val[i+1]] )
            {
                DataManage._data[val[i]].num *= 2;
                DataManage._data[val[i]].nextIsAnm = true;
                DataManage._data[val[i+1]].nextIsRemove = true;
                DataManage._data[val[i+1]] = 0;

                this.score += DataManage._data[val[i]].num;
                i++;
            }
        }
    }

    public static isHaveMoveRect:boolean = false;
    //播放所有方块的动画
    private static playAllRect():void
    {
        var rel:boolean = false;
        for( var i:number=0; i<16; i++ )
        {
            //DataManage._rects[i].playAnimation();
            rel = DataManage._rects[i].playAnimation();
            if( rel == true )
            {
                DataManage.isHaveMoveRect = true;
            }
        }
    }
    //
}