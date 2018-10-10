var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var PlayerInfo = (function () {
    function PlayerInfo() {
        this.data = { topMission: 1, gold: 0, heart: 0 };
    }
    PlayerInfo.prototype.saveMission = function (mission) {
        if (mission >= this.data.topMission) {
            this.data.topMission = mission;
        }
        this.save();
    };
    PlayerInfo.prototype.initData = function () {
        var localData = egret.localStorage.getItem("gameLocalData");
        if (localData) {
            this.data = JSON.parse(localData);
        }
    };
    PlayerInfo.prototype.save = function () {
        var s = JSON.stringify(this.data);
        egret.localStorage.setItem("gameLocalData", s);
    };
    return PlayerInfo;
}());
__reflect(PlayerInfo.prototype, "PlayerInfo");
//# sourceMappingURL=PlayerInfo.js.map