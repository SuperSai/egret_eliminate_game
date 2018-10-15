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
 * 战斗暂停面板
 */
var BattlePausePanel = (function (_super) {
    __extends(BattlePausePanel, _super);
    function BattlePausePanel($controller, $layer) {
        var _this = _super.call(this, $controller, $layer, SkinName.BattlePausePanelSkin) || this;
        var self = _this;
        self.cacheAsBitmap = true;
        return _this;
    }
    BattlePausePanel.prototype.addEvents = function () {
        _super.prototype.addEvents.call(this);
        var self = this;
        self.btn_exit.addEventListener(egret.TouchEvent.TOUCH_TAP, self.onExitHandler, self);
        self.btn_cancel.addEventListener(egret.TouchEvent.TOUCH_TAP, self.onCancelHandler, self);
        self.setBtnEffect(["btn_exit", "btn_cancel"]);
    };
    BattlePausePanel.prototype.removeEvents = function () {
        _super.prototype.removeEvents.call(this);
        var self = this;
        self.btn_exit.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.onExitHandler, self);
        self.btn_cancel.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.onCancelHandler, self);
    };
    BattlePausePanel.prototype.onExitHandler = function () {
        var self = this;
        App.ViewManager.close(ViewConst.BattlePausePanel);
        App.ViewManager.close(ViewConst.BattleMission);
    };
    BattlePausePanel.prototype.onCancelHandler = function () {
        var self = this;
        App.ViewManager.close(ViewConst.BattlePausePanel);
    };
    return BattlePausePanel;
}(BaseEuiAlert));
__reflect(BattlePausePanel.prototype, "BattlePausePanel");
