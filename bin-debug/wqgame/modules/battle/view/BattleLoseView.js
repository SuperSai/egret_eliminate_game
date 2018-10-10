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
 * 失败界面
 */
var BattleLoseView = (function (_super) {
    __extends(BattleLoseView, _super);
    function BattleLoseView($controller, $layer) {
        var _this = _super.call(this, $controller, $layer, SkinName.BattleLoseSkin) || this;
        var self = _this;
        self.isMaskTouch = false;
        self.setResources(["gameOver"]);
        return _this;
    }
    BattleLoseView.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        var self = this;
        self._model = param[0];
        self.txt_mission.text = App.LanguageManager.getLanguageText("battle.txt.01", self._model.enterMission);
    };
    BattleLoseView.prototype.addEvents = function () {
        _super.prototype.addEvents.call(this);
        var self = this;
        self.btn_again.addEventListener(egret.TouchEvent.TOUCH_TAP, self.onAgainHandler, self);
        self.btn_exit.addEventListener(egret.TouchEvent.TOUCH_TAP, self.onExitHandler, self);
        self.setBtnEffect(["btn_again", "btn_exit"]);
    };
    BattleLoseView.prototype.removeEvents = function () {
        _super.prototype.removeEvents.call(this);
        var self = this;
        self.btn_again.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.onAgainHandler, self);
        self.btn_exit.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.onExitHandler, self);
    };
    /** 再来一次 */
    BattleLoseView.prototype.onAgainHandler = function () {
        var self = this;
        App.ViewManager.close(ViewConst.BattleWin);
        self._model.reset();
        App.ViewManager.open(ViewConst.BattleMission);
    };
    /** 退出 */
    BattleLoseView.prototype.onExitHandler = function () {
        var self = this;
        App.ViewManager.close(ViewConst.BattleWin);
        App.ViewManager.close(ViewConst.BattleMission);
    };
    return BattleLoseView;
}(BaseEuiAlert));
__reflect(BattleLoseView.prototype, "BattleLoseView");
//# sourceMappingURL=BattleLoseView.js.map