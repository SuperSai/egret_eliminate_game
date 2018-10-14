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
 *  关卡面板
 */
var MissionPanel = (function (_super) {
    __extends(MissionPanel, _super);
    function MissionPanel($controller, $layer) {
        var _this = _super.call(this, $controller, $layer, SkinName.MissionPanelSkin) || this;
        var self = _this;
        self._model = self.controller.getModel();
        self.cacheAsBitmap = true;
        return _this;
    }
    MissionPanel.prototype.initData = function () {
        _super.prototype.initData.call(this);
        var self = this;
        self.txt_title.text = App.LanguageManager.getLanguageText("battle.txt.01", self._model.enterMission);
        self.txt_condition.text = App.LanguageManager.getLanguageText("battle.txt.05", self._model.targetScore);
    };
    MissionPanel.prototype.addEvents = function () {
        _super.prototype.addEvents.call(this);
        var self = this;
        self.btn_start.addEventListener(egret.TouchEvent.TOUCH_TAP, self.onEnterBattleMission, self);
        self.setBtnEffect(["btn_start", "btn_close"]);
    };
    MissionPanel.prototype.removeEvents = function () {
        _super.prototype.removeEvents.call(this);
        var self = this;
        self.btn_start.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.onEnterBattleMission, self);
    };
    /** 进入战斗关卡 */
    MissionPanel.prototype.onEnterBattleMission = function () {
        var self = this;
        self.applyFunc(BattleConst.BATTLE_ENTER_MISSION);
    };
    return MissionPanel;
}(BaseEuiAlert));
__reflect(MissionPanel.prototype, "MissionPanel");
//# sourceMappingURL=MissionPanel.js.map