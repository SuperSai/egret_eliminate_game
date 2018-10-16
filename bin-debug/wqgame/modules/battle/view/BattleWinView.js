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
 * 胜利界面
 */
var BattleWinView = (function (_super) {
    __extends(BattleWinView, _super);
    function BattleWinView($controller, $layer) {
        var _this = _super.call(this, $controller, $layer, SkinName.BattleWinSkin) || this;
        var self = _this;
        self.isMaskTouch = false;
        self.setResources(["gameOver"]);
        self.cacheAsBitmap = true;
        return _this;
    }
    BattleWinView.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        var self = this;
        self._model = param[0];
        self.txt_mission.text = App.LanguageManager.getLanguageText("battle.txt.01", self._model.enterMission);
        App.PlayerInfoManager.Info.saveMission(self._model.enterMission + 1);
    };
    BattleWinView.prototype.addEvents = function () {
        _super.prototype.addEvents.call(this);
        var self = this;
        self.btn_next.addEventListener(egret.TouchEvent.TOUCH_TAP, self.onNextMission, self);
        self.btn_exit.addEventListener(egret.TouchEvent.TOUCH_TAP, self.onExitHandler, self);
        self.setBtnEffect(["btn_next", "btn_exit"]);
    };
    BattleWinView.prototype.removeEvents = function () {
        _super.prototype.removeEvents.call(this);
        var self = this;
        self.btn_next.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.onNextMission, self);
        self.btn_exit.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.onExitHandler, self);
    };
    /** 进入下一关卡 */
    BattleWinView.prototype.onNextMission = function () {
        var self = this;
        App.ViewManager.close(ViewConst.BattleWinPanel);
        self._model.initMissionData(self._model.enterMission + 1);
        App.ViewManager.open(ViewConst.BattleMission);
    };
    /** 退出 */
    BattleWinView.prototype.onExitHandler = function () {
        var self = this;
        App.ViewManager.close(ViewConst.BattleWinPanel);
        App.ViewManager.close(ViewConst.BattleMission);
    };
    BattleWinView.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        _super.prototype.close.call(this, param);
        var self = this;
        App.ControllerManager.applyFunc(ControllerConst.Battle, BattleConst.MAP_ITEM_UPDATE);
    };
    return BattleWinView;
}(BaseEuiAlert));
__reflect(BattleWinView.prototype, "BattleWinView");
//# sourceMappingURL=BattleWinView.js.map