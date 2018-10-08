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
 * 战斗关卡界面
 */
var BattleMissionView = (function (_super) {
    __extends(BattleMissionView, _super);
    function BattleMissionView($controller, $layer) {
        var _this = _super.call(this, $controller, $layer) || this;
        var self = _this;
        self.skinName = SkinName.BattleMissionViewSkin;
        return _this;
        // self.setResources(["battle"]);
    }
    BattleMissionView.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        var self = this;
    };
    BattleMissionView.prototype.initData = function () {
        _super.prototype.initData.call(this);
    };
    BattleMissionView.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        _super.prototype.open.call(this, param);
        var self = this;
    };
    BattleMissionView.prototype.addEvents = function () {
        _super.prototype.addEvents.call(this);
        var self = this;
    };
    BattleMissionView.prototype.removeEvents = function () {
        _super.prototype.removeEvents.call(this);
        var self = this;
    };
    return BattleMissionView;
}(BaseEuiView));
__reflect(BattleMissionView.prototype, "BattleMissionView");
//# sourceMappingURL=BattleMissionView.js.map