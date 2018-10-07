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
var BattleModel = (function (_super) {
    __extends(BattleModel, _super);
    function BattleModel($controller) {
        var _this = _super.call(this, $controller) || this;
        /** 总地图数量 */
        _this.maxMapCount = 15;
        /** 开放的地图数量 */
        _this.openMapCount = 2;
        /** 当前关卡 */
        _this.currMission = 1;
        /** 通关的关卡 */
        _this.passMission = 2;
        var self = _this;
        self.init();
        return _this;
    }
    /** 初始化 */
    BattleModel.prototype.init = function () {
        var self = this;
    };
    Object.defineProperty(BattleModel.prototype, "levelVO", {
        /** 关卡表模板数据 */
        get: function () {
            return this._levelVO;
        },
        set: function (value) {
            this._levelVO = value;
        },
        enumerable: true,
        configurable: true
    });
    return BattleModel;
}(BaseModel));
__reflect(BattleModel.prototype, "BattleModel");
//# sourceMappingURL=BattleModel.js.map