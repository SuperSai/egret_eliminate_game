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
var MapBtnItem = (function (_super) {
    __extends(MapBtnItem, _super);
    function MapBtnItem() {
        return _super.call(this, SkinName.MapBtnItemSkin) || this;
    }
    MapBtnItem.prototype.onAwake = function ($data) {
        _super.prototype.onAwake.call(this, $data);
        var self = this;
        self.init();
        self.initPosition();
        self.addEvents();
    };
    /** 初始化 */
    MapBtnItem.prototype.init = function () {
        var self = this;
        self._mapIndex = self.data[0];
        self.txt_index.text = self._mapIndex * 2 * 10 + self.data[1] + "";
    };
    /** 初始化位置 */
    MapBtnItem.prototype.initPosition = function () {
        var self = this;
        self.x = self.data[2];
        self.y = self.data[3];
    };
    MapBtnItem.prototype.addEvents = function () {
        var self = this;
        self.addEventListener(egret.TouchEvent.TOUCH_TAP, self.onSelectLevel, self);
    };
    MapBtnItem.prototype.removeEvents = function () {
        _super.prototype.removeEvents.call(this);
        var self = this;
        self.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.onSelectLevel, self);
    };
    /** 选择关卡 */
    MapBtnItem.prototype.onSelectLevel = function () {
        var self = this;
        App.ControllerManager.applyFunc(ControllerConst.Battle, BattleConst.BATTLE_SELECT_LEVEL, self._mapIndex);
    };
    return MapBtnItem;
}(BaseEuiItem));
__reflect(MapBtnItem.prototype, "MapBtnItem");
//# sourceMappingURL=MapBtnItem.js.map