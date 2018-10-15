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
var Grid = (function (_super) {
    __extends(Grid, _super);
    function Grid($id) {
        var _this = _super.call(this) || this;
        _this.id = 0;
        _this.row = 0;
        _this.column = 0;
        _this.moveFlag = false;
        _this.checkMark = false; // 检查标志
        _this.isSelected = false;
        _this.isAction = false;
        _this.moveSpeed = 400;
        var self = _this;
        self.id = $id;
        self._icon = new eui.Image();
        self.addChild(self._icon);
        self.cacheAsBitmap = true;
        self.addEventListener(egret.Event.ADDED_TO_STAGE, self.onAddToStage, self);
        return _this;
    }
    Grid.prototype.onAddToStage = function () {
        var self = this;
        self.init();
    };
    Grid.prototype.init = function () {
        var self = this;
        var texture = RES.getRes("battle_icon_" + self.id);
        if (texture) {
            this.width = Grid.Width;
            this.height = Grid.Height;
            this.anchorOffsetX = this.width / 2;
            this.anchorOffsetY = this.height / 2;
            self._icon.source = texture;
            self._icon.anchorOffsetX = self._icon.width / 2;
            self._icon.anchorOffsetY = self._icon.height / 2;
            self._icon.x = self.width / 2;
            self._icon.y = self.height / 2;
        }
    };
    Object.defineProperty(Grid.prototype, "selectState", {
        set: function (value) {
            var self = this;
            if (self.isSelected != value) {
                self.isSelected = value;
                if (value) {
                    self._icon.source = "battle_icon_s_" + self.id;
                    self.doSelectedTween();
                }
                else {
                    self._icon.source = "battle_icon_" + self.id;
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    /** 执行选择后的缓动处理 */
    Grid.prototype.doSelectedTween = function () {
        var self = this;
        if (self.isAction == false) {
            self.isAction = true;
            // SoundsMgr.clickCell();
            egret.Tween.removeTweens(self);
            var tw = egret.Tween.get(self);
            tw.to({ scaleX: 0.8, scaleY: 1.3 }, 100, egret.Ease.bounceIn)
                .to({ scaleX: 1.1, scaleY: 1 }, 100, egret.Ease.bounceOut)
                .to({ scaleX: 1, scaleY: 1 }, 100, egret.Ease.backIn)
                .call(function () {
                self.isAction = false;
            }, self);
        }
    };
    /** 重置 */
    Grid.prototype.reset = function () {
        var self = this;
        ObjectUtils.removeFromArray(self, App.GridManager.clearList);
        App.GridManager.clearGrid(self);
        var tw = egret.Tween.get(self);
        tw.to({ scaleX: 0.4, scaleY: 0.4 }, 200)
            .call(function () {
            self.resetComplete();
        }, self)
            .wait(50)
            .call(function (args) {
            if (self.parent) {
                self.parent.removeChild(self);
            }
            else {
                egret.log("no parent");
            }
        }, self, [self]);
    };
    /** 重置完毕 */
    Grid.prototype.resetComplete = function () {
        App.ControllerManager.applyFunc(ControllerConst.Battle, BattleConst.GRID_RESET_COMPLETE);
    };
    /** 掉落 */
    Grid.prototype.drop = function (row, column) {
        var self = this;
        var gx = App.GridManager.getGridPosX(column);
        var gy = App.GridManager.getGridPosY(row);
        var dis = App.MathUtils.getDistance(self.x, self.y, gx, gy);
        var time = (dis / self.moveSpeed) * 1000;
        self.moveFlag = true;
        App.GridManager.setGrid(self, row, column);
        var tw = egret.Tween.get(self);
        tw.to({ x: gx, y: gy }, time, egret.Ease.bounceOut).call(function () {
            self.moveFlag = false;
            self.dropComplete();
        }, self);
    };
    Grid.prototype.dropComplete = function () {
        App.ControllerManager.applyFunc(ControllerConst.Battle, BattleConst.GRID_DROP_COMPLETE);
    };
    Grid.Width = 86;
    Grid.Height = 86;
    return Grid;
}(egret.Sprite));
__reflect(Grid.prototype, "Grid");
