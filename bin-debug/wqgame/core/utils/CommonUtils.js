var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
/**
 * 通用工具类
 */
var CommonUtils = (function (_super) {
    __extends(CommonUtils, _super);
    function CommonUtils() {
        var _this = _super.call(this) || this;
        _this._token = 0;
        /**
         * 万字的显示
         * @param label
         * @param num
         */
        _this.labelIsOverLenght = function (label, num) {
            var str = null;
            if (num < 100000) {
                str = num;
            }
            else if (num < 1000000) {
                str = Math.floor(num / 1000 / 10).toString() + "万";
            }
            else {
                str = Math.floor(num / 10000).toString() + "万";
            }
            label.text = str;
        };
        return _this;
    }
    Object.defineProperty(CommonUtils.prototype, "Token", {
        get: function () {
            return this._token++;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 给字体添加描边
     * @param lable      文字
     * @param color      表示文本的描边颜色
     * @param width      描边宽度。
     */
    CommonUtils.prototype.addLableStrokeColor = function (lable, color, width) {
        lable.strokeColor = color;
        lable.stroke = width;
    };
    /**
     * 锁屏
     */
    CommonUtils.prototype.lock = function () {
        var stage = App.StageUtils.getStage();
        stage.$children.forEach(function (child) {
            if (child instanceof egret.DisplayObjectContainer) {
                child.touchEnabled = child.touchChildren = false;
            }
        });
    };
    /**
     * 解屏
     */
    CommonUtils.prototype.unlock = function () {
        var stage = App.StageUtils.getStage();
        stage.$children.forEach(function (child) {
            if (child instanceof egret.DisplayObjectContainer) {
                child.touchEnabled = child.touchChildren = true;
            }
        });
    };
    /**
     * int64转number
     * @param obj
     * @returns {number}
     */
    CommonUtils.prototype.int64ToNumber = function (obj) {
        return parseInt(obj.toString());
    };
    /** 获取2点之间的移动速度 */
    CommonUtils.prototype.getSpeed = function (targetP2, currentP1, SpeedNum) {
        var speed = new egret.Point();
        var hypotenuse = egret.Point.distance(targetP2, currentP1); // App.MathUtils.getDistance(targetP2.x, targetP2.y, currentP1.x, currentP1.y);
        if (hypotenuse == 0) {
            speed.x = 0;
            speed.y = 0;
            return speed;
        }
        speed.x = SpeedNum * (targetP2.x - currentP1.x) / hypotenuse;
        speed.y = SpeedNum * (targetP2.y - currentP1.y) / hypotenuse;
        return speed;
    };
    CommonUtils.prototype.numPrecentage = function (cint, mint, countCop) {
        var value = Math.floor(cint / mint * countCop);
        if (value > countCop) {
            value = countCop;
        }
        return value;
    };
    return CommonUtils;
}(BaseClass));
__reflect(CommonUtils.prototype, "CommonUtils");
//# sourceMappingURL=CommonUtils.js.map