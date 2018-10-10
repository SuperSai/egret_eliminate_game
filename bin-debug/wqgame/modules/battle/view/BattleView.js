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
 * 战斗界面
 */
var BattleView = (function (_super) {
    __extends(BattleView, _super);
    function BattleView($controller, $layer) {
        var _this = _super.call(this, $controller, $layer) || this;
        var self = _this;
        self.skinName = SkinName.BattleViewSkin;
        self.setResources(["battle"]);
        return _this;
    }
    /** 对面板进行显示初始化，用于子类继承 */
    BattleView.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        var self = this;
        self.currency.initUI();
        self.map = new BattleMap(self.controller, LayerManager.GAME_MAP_LAYER);
        self.scroller.viewport = self.map.container;
        self.map.addToParent();
    };
    /** 对面板数据的初始化，用于子类继承 */
    BattleView.prototype.initData = function () {
        _super.prototype.initData.call(this);
    };
    /** 面板开启执行函数，用于子类继承 */
    BattleView.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        _super.prototype.open.call(this, param);
        var self = this;
        self._model = self.controller.getModel();
        //初始化地图数据
        self.map.open(self.controller);
        self.scroller.validateNow();
        self.scroller.viewport.scrollV = self.scroller.viewport.contentHeight - self.scroller.viewport.height;
    };
    BattleView.prototype.addEvents = function () {
        _super.prototype.addEvents.call(this);
        var self = this;
        self.scroller.addEventListener(egret.Event.CHANGE, self.onMapChange, self);
        self.registerFunc(BattleConst.MAP_ITEM_UPDATE, self.onUpdateMapItem, self);
    };
    BattleView.prototype.removeEvents = function () {
        _super.prototype.removeEvents.call(this);
        var self = this;
        self.scroller.removeEventListener(egret.Event.CHANGE, self.onMapChange, self);
    };
    BattleView.prototype.onMapChange = function () {
        var self = this;
        //已经滑动到顶部
        if (self.scroller.viewport.scrollV == 0) {
            var maxMission = self._model.getMapIndex(App.PlayerInfoManager.Info.data.topMission) * 2 * 10;
            if (self._model.mapItemDic.ContainsKey(maxMission)) {
                if (self._model.mapItemDic.TryGetValue(maxMission).isListener) {
                    self.map.addMap();
                    self.scroller.viewport.validateNow();
                }
            }
        }
    };
    /** 更新地图Item数据 */
    BattleView.prototype.onUpdateMapItem = function () {
        var self = this;
        self._model.mapItemDic.TryGetValue(App.PlayerInfoManager.Info.data.topMission).initState();
        self._model.mapItemDic.TryGetValue(App.PlayerInfoManager.Info.data.topMission - 1).initState();
    };
    return BattleView;
}(BaseEuiView));
__reflect(BattleView.prototype, "BattleView");
//# sourceMappingURL=BattleView.js.map