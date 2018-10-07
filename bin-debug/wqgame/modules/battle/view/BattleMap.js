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
 * 战斗地图
 */
var BattleMap = (function (_super) {
    __extends(BattleMap, _super);
    function BattleMap($controller, $layer) {
        var _this = _super.call(this, $controller, $layer) || this;
        _this.skinName = SkinName.BattleMapSkin;
        return _this;
    }
    /** 面板开启执行函数，用于子类继承 */
    BattleMap.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        _super.prototype.open.call(this, param);
        var self = this;
        self._battleController = param[0];
        self._model = self._battleController.getModel();
        self.init();
        self.initMap();
        self.addEvents();
    };
    /** 初始化 */
    BattleMap.prototype.init = function () {
        var self = this;
    };
    /** 初始化地图 */
    BattleMap.prototype.initMap = function () {
        var self = this;
        for (var i = self._model.openMapCount; i > 0; i--) {
            var mapCon = self.createMap(i);
            self.initLevel(mapCon, i);
            self.mapGroup.addChild(mapCon);
        }
    };
    /** 初始化关卡 */
    BattleMap.prototype.initLevel = function (mapCon, index) {
        var self = this;
        var posList = [[588, 1060], [424, 1064], [311, 1162]];
        for (var i = 0; i < posList.length; i++) {
            var levelItem = new MapBtnItem();
            levelItem.anchorOffsetX = 45;
            levelItem.anchorOffsetY = 45;
            levelItem.onAwake([index - 1, i + 1, posList[i][0], posList[i][1]]);
            mapCon.addChild(levelItem);
        }
    };
    /** 添加新地图 */
    BattleMap.prototype.addMap = function () {
        var self = this;
        if (self._model.openMapCount < self._model.maxMapCount) {
            self._model.openMapCount++;
            var mapCon = self.createMap(self._model.openMapCount);
            self.initLevel(mapCon, self._model.openMapCount);
            self.mapGroup.addChildAt(mapCon, 0);
        }
    };
    /** 创建地图 */
    BattleMap.prototype.createMap = function (index) {
        var self = this;
        var mapCon = ObjectPool.pop(eui.Group, "eui.Group");
        mapCon.width = 720, mapCon.height = 1280;
        var mapIcon = ObjectPool.pop(eui.Image, "eui.Image");
        var path = PathConfig.MapPath.replace("{0}", index > 9 ? "100" + index : "1000" + index);
        App.DisplayUtils.addAsyncBitmapToImage(path, mapIcon);
        mapCon.addChild(mapIcon);
        return mapCon;
    };
    BattleMap.prototype.addEvents = function () {
        _super.prototype.addEvents.call(this);
        var self = this;
        App.StageUtils.getStage().addEventListener(egret.TouchEvent.TOUCH_TAP, self.onGetMapPos, self);
    };
    BattleMap.prototype.removeEvents = function () {
        _super.prototype.removeEvents.call(this);
        var self = this;
    };
    BattleMap.prototype.onGetMapPos = function (evt) {
        Log.trace(evt.stageX + "," + evt.stageY);
    };
    return BattleMap;
}(BaseEuiView));
__reflect(BattleMap.prototype, "BattleMap");
//# sourceMappingURL=BattleMap.js.map