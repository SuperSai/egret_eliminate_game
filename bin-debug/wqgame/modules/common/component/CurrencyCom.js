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
 * 货币组组件
 */
var CurrencyCom = (function (_super) {
    __extends(CurrencyCom, _super);
    function CurrencyCom($controller, $layer) {
        var _this = _super.call(this, $controller, $layer) || this;
        _this.skinName = SkinName.CurrencyComSkin;
        return _this;
    }
    /** 对面板进行显示初始化，用于子类继承 */
    CurrencyCom.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        var self = this;
        self.addEvents();
    };
    /**
     * 添加监听事件
     */
    CurrencyCom.prototype.addEvents = function () {
        _super.prototype.addEvents.call(this);
    };
    /**
     * 移除监听事件
     */
    CurrencyCom.prototype.removeEvents = function () {
        _super.prototype.removeEvents.call(this);
    };
    return CurrencyCom;
}(BaseEuiView));
__reflect(CurrencyCom.prototype, "CurrencyCom");
