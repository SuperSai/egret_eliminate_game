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
        /** 当前进入关卡 */
        _this.enterMission = 0;
        /** 当前步数 */
        _this.currStep = 0;
        /** 总步数 */
        _this.totalStep = 0;
        /** 当前分数 */
        _this.currScore = 0;
        /** 目标分数 */
        _this.targetScore = 0;
        /** 是否结束 */
        _this.isOver = false;
        /** 是否通关 */
        _this.isWin = false;
        var self = _this;
        self.init();
        return _this;
    }
    /** 初始化 */
    BattleModel.prototype.init = function () {
        var self = this;
        self.mapItemDic = new TSDictionary();
        // self.maxMapCount = parseInt(GlobleVOData.getDataByFilter(GlobleVOData.ServerConfigVO, "id", "MAX_MAP_COUNT")[0].value);
    };
    BattleModel.prototype.initMissionData = function (mission) {
        var self = this;
        this.reset();
        var vo = GlobleVOData.getData(GlobleVOData.LevelVO, mission);
        if (vo) {
            self.targetScore = vo.score;
            self.totalStep = vo.step;
            self.currStep = self.totalStep;
            self.enterMission = mission;
        }
    };
    BattleModel.prototype.getMapIndex = function (mission) {
        var self = this;
        for (var i = 0; i < self.openMapCount; i++) {
            var value = mission - i * 2 * 10;
            var value2 = i * 2 * 10 + value;
            if (value2 == mission) {
                return i + 1;
            }
        }
        return 0;
    };
    BattleModel.prototype.reset = function () {
        this.enterMission = 0;
        this.currStep = 0;
        this.totalStep = 0;
        this.currScore = 0;
        this.targetScore = 0;
        this.isOver = false;
        this.isWin = false;
    };
    return BattleModel;
}(BaseModel));
__reflect(BattleModel.prototype, "BattleModel");
var BattleState;
(function (BattleState) {
    BattleState[BattleState["DealLogic"] = 0] = "DealLogic";
    BattleState[BattleState["Play"] = 1] = "Play";
})(BattleState || (BattleState = {}));
