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
 * 大厅主界面
 */
var HallView = (function (_super) {
    __extends(HallView, _super);
    function HallView($controller, $layer) {
        var _this = _super.call(this, $controller, $layer) || this;
        var self = _this;
        self.skinName = SkinName.HallViewSkin;
        self.setResources(["hall"]);
        self._model = self.controller.getModel();
        return _this;
    }
    /** 对面板进行显示初始化，用于子类继承 */
    HallView.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        var self = this;
        self.currency.initUI();
    };
    /** 对面板数据的初始化，用于子类继承 */
    HallView.prototype.initData = function () {
        _super.prototype.initData.call(this);
    };
    /** 面板开启执行函数，用于子类继承 */
    HallView.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        _super.prototype.open.call(this, param);
        var self = this;
    };
    HallView.prototype.addEvents = function () {
        _super.prototype.addEvents.call(this);
        var self = this;
        self.btn_map.addEventListener(egret.TouchEvent.TOUCH_TAP, self.onEnterMapView, self);
        self.setBtnEffect(["btn_map"]);
    };
    HallView.prototype.removeEvents = function () {
        _super.prototype.removeEvents.call(this);
        var self = this;
        self.btn_map.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.onEnterMapView, self);
    };
    /** 进入关卡选择地图 */
    HallView.prototype.onEnterMapView = function () {
        var self = this;
        App.SceneManager.clear();
        App.SceneManager.runScene(SceneConsts.BATTLE);
    };
    return HallView;
}(BaseEuiView));
__reflect(HallView.prototype, "HallView");
//# sourceMappingURL=HallView.js.map