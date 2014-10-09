/**
 * Created by mebius on 14-7-22.
 */
var Util = (function () {
    function Util() {
    }
    //通过行和列得到0-15之间的编号
    Util.getIndexByLineRow = function (row, column) {
        return row * 4 + column;
    };
    //通过盒子中的 行和列 的值，返回盒子的 坐标
    Util.getPosByRect = function (val) {
        var point = new egret.Point();
        point.x = 10 + val.width / 2 + (10 + val.width) * val.column;
        point.y = 10 + val.width / 2 + (10 + val.width) * val.row;
        return point;
    };
    //通过 0-15之间的编号，返回 行和列
    Util.getPosByIndex = function (index) {
        var point = new egret.Point();
        point.x = Math.floor(index / 4);
        point.y = Math.floor(index % 4);
        return point;
    };
    return Util;
})();
