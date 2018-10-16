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
    CommonUtils.prototype.formatString = function (argu) {
        var i = 0, a, f = argu[i++], o = [], m, p, c, x, s = '';
        while (f) {
            if (m = /^[^\x25]+/.exec(f)) {
                o.push(m[0]);
            }
            else if (m = /^\x25{2}/.exec(f)) {
                o.push('%');
            }
            else if (m = /^\x25(?:(\d+)\$)?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-fosuxX])/.exec(f)) {
                if (((a = argu[m[1] || i++]) == null) || (a == undefined)) {
                    throw ('Too few arguments.');
                }
                if (/[^s]/.test(m[7]) && (typeof (a) != 'number')) {
                    throw ('Expecting number but found ' + typeof (a));
                }
                switch (m[7]) {
                    case 'b':
                        a = a.toString(2);
                        break;
                    case 'c':
                        a = String.fromCharCode(a);
                        break;
                    case 'd':
                        a = parseInt(a);
                        break;
                    case 'e':
                        a = m[6] ? a.toExponential(m[6]) : a.toExponential();
                        break;
                    case 'f':
                        a = m[6] ? parseFloat(a).toFixed(m[6]) : parseFloat(a);
                        break;
                    case 'o':
                        a = a.toString(8);
                        break;
                    case 's':
                        a = ((a = String(a)) && m[6] ? a.substring(0, m[6]) : a);
                        break;
                    case 'u':
                        a = Math.abs(a);
                        break;
                    case 'x':
                        a = a.toString(16);
                        break;
                    case 'X':
                        a = a.toString(16).toUpperCase();
                        break;
                }
                a = (/[def]/.test(m[7]) && m[2] && a >= 0 ? '+' + a : a);
                c = m[3] ? m[3] == '0' ? '0' : m[3].charAt(1) : ' ';
                x = m[5] - String(a).length - s.length;
                p = m[5] ? this.str_repeat(c, x) : '';
                o.push(s + (m[4] ? a + p : p + a));
            }
            else {
                throw ('Huh ?!');
            }
            f = f.substring(m[0].length);
        }
        return o.join('');
    };
    CommonUtils.prototype.str_repeat = function (str, num) {
        return new Array(num + 1).join(str);
    };
    return CommonUtils;
}(BaseClass));
__reflect(CommonUtils.prototype, "CommonUtils");
//# sourceMappingURL=CommonUtils.js.map