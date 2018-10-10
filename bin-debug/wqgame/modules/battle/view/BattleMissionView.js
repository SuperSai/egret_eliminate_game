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
        _this.state = BattleState.Play;
        var self = _this;
        self.skinName = SkinName.BattleMissionViewSkin;
        self.setResources(["battleMission"]);
        self._model = self.controller.getModel();
        return _this;
    }
    BattleMissionView.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        var self = this;
        this.initLinePanel();
        this.initGridPanel();
        this.initCell();
    };
    BattleMissionView.prototype.initData = function () {
        _super.prototype.initData.call(this);
        var self = this;
        self.txt_mission.text = self._model.enterMission + "";
        self.txt_step.text = self._model.totalStep + "";
        self.txt_score.text = App.LanguageManager.getLanguageText("battle.txt.04", self._model.currScore);
        self.txt_targetScore.text = App.LanguageManager.getLanguageText("battle.txt.03", self._model.targetScore);
    };
    BattleMissionView.prototype.initCell = function () {
        App.GridManager.clearList = [];
        App.GridManager.cleanGridArray();
        for (var i = 0; i < App.GridManager.row; i++) {
            for (var j = 0; j < App.GridManager.column; j++) {
                var id = App.GridManager.genInitGridId(i, j);
                var cell = BattleLogic.createGrid(this.gridPanel, i, j, id);
                cell.x = App.GridManager.getGridPosX(j);
                cell.y = App.GridManager.getGridPosY(i);
            }
        }
    };
    BattleMissionView.prototype.initGridPanel = function () {
        if (this.gridPanel) {
            App.DisplayUtils.removeAllChildren(this.gridPanel);
        }
        this.gridPanel = new egret.Sprite();
        this.gridPanel.name = "gridPanel";
        this.gridPanel.width = App.GridManager.column * Grid.Width + (App.GridManager.column - 1) * App.GridManager.columnSpace;
        this.gridPanel.height = App.GridManager.row * Grid.Height + (App.GridManager.row - 1) * App.GridManager.rowSpace;
        this.gridPanel.anchorOffsetX = this.gridPanel.width / 2;
        this.gridPanel.anchorOffsetY = this.gridPanel.height;
        this.gridPanel.x = App.StageUtils.getWidth() / 2;
        this.gridPanel.y = App.StageUtils.getHeight() / 2 + 200;
        var rect = new eui.Rect(this.gridPanel.width, this.gridPanel.height, 0x0000ff);
        rect.alpha = 0;
        this.gridPanel.addChild(rect);
        this.gridPanel.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegan, this);
        this.gridPanel.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        this.gridPanel.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        this.gridPanel.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onOutSide, this);
        this.addChild(this.gridPanel);
    };
    BattleMissionView.prototype.initLinePanel = function () {
        if (this.linePanel) {
            App.DisplayUtils.removeAllChildren(this.linePanel);
        }
        this.linePanel = new egret.Sprite();
        this.linePanel.name = "linePanel";
        this.linePanel.width = App.GridManager.column * Grid.Width + (App.GridManager.column - 1) * App.GridManager.columnSpace;
        this.linePanel.height = App.GridManager.row * Grid.Height + (App.GridManager.row - 1) * App.GridManager.rowSpace;
        this.linePanel.anchorOffsetX = this.linePanel.width / 2;
        this.linePanel.anchorOffsetY = this.linePanel.height;
        this.linePanel.x = App.StageUtils.getWidth() / 2;
        this.linePanel.y = App.StageUtils.getHeight() / 2 + 200;
        this.linePanel.graphics.beginFill(0x00ff00, 0);
        this.linePanel.graphics.drawRect(0, 0, this.linePanel.width, this.linePanel.height);
        this.linePanel.graphics.endFill();
        this.addChild(this.linePanel);
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
        self.btn_pause.addEventListener(egret.TouchEvent.TOUCH_TAP, self.onPauseHandler, self);
        self.setBtnEffect(["btn_pause"]);
        self.registerFunc(BattleConst.GRID_RESET_COMPLETE, self.cleanOneByeOne, self);
        self.registerFunc(BattleConst.GRID_DROP_COMPLETE, self.onGridDropComplete, self);
    };
    BattleMissionView.prototype.removeEvents = function () {
        _super.prototype.removeEvents.call(this);
        var self = this;
        self.btn_pause.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.onPauseHandler, self);
    };
    BattleMissionView.prototype.onPauseHandler = function () {
        var self = this;
    };
    BattleMissionView.prototype.onOutSide = function () {
        this.onTouchEnd();
    };
    BattleMissionView.prototype.onTouchBegan = function (touch) {
        if (this.state == BattleState.Play) {
            BattleLogic.doTouchBegan(this.pointLine, this.linePanel, this.pointLineBeganCell, touch.stageX, touch.stageY);
        }
    };
    BattleMissionView.prototype.onTouchMove = function (touch) {
        if (this.state == BattleState.Play) {
            BattleLogic.doTouchMove(this.pointLine, this.linePanel, this.pointLineBeganCell, touch.stageX, touch.stageY);
        }
    };
    BattleMissionView.prototype.onTouchEnd = function () {
        // 判断消除
        var listLenght = App.GridManager.clearList.length;
        Log.trace("可以消除的数量为: " + listLenght);
        if (listLenght >= App.GridManager.baseCleanNum) {
            if (this.state == BattleState.Play) {
                this.state = BattleState.DealLogic;
                this.cleanOneByeOne();
            }
        }
        for (var k in App.GridManager.clearList) {
            var item = App.GridManager.clearList[k];
            item.selectState = false;
        }
        this.linePanel.removeChildren();
    };
    BattleMissionView.prototype.cleanOneByeOne = function () {
        var len = App.GridManager.clearList.length;
        if (len == 0) {
            BattleLogic.deleteClearList();
            BattleLogic.dropAndFillGrid(this.gridPanel);
        }
        else {
            var item = App.GridManager.clearList[0];
            BattleLogic.createDirty(this.gridPanel, item);
            this.addScore(10, item);
            item.reset();
            // SoundsMgr.removeCell(this.cleanIndex);
            BattleLogic.cleanIndex++;
        }
    };
    BattleMissionView.prototype.addScore = function (score, grid) {
        var self = this;
        self._model.currScore += score;
        self.txt_score.text = App.LanguageManager.getLanguageText("battle.txt.04", self._model.currScore);
        var scoreLabel = new eui.Label();
        scoreLabel.text = score.toString();
        scoreLabel.anchorOffsetX = scoreLabel.width / 2;
        scoreLabel.anchorOffsetY = scoreLabel.height / 2;
        scoreLabel.x = grid.x;
        scoreLabel.y = grid.y;
        self.gridPanel.addChild(scoreLabel);
        var tw2 = egret.Tween.get(scoreLabel);
        tw2.to({ y: grid.y - 40 }, 400)
            .call(function (node) {
            egret.Tween.removeTweens(node);
            App.DisplayUtils.removeFromParent(node);
        }, self, [scoreLabel]);
    };
    BattleMissionView.prototype.onGridDropComplete = function () {
        var isMove = App.GridManager.isAllMove();
        //没有移动的格子了
        if (!isMove) {
            this.state = BattleState.Play;
            this.checkStep();
        }
    };
    /** 检查步数 */
    BattleMissionView.prototype.checkStep = function () {
        var self = this;
        self._model.currStep--;
        this.txt_step.text = self._model.currStep.toString();
        if (self._model.currStep <= 0) {
            self._model.currStep = 0;
            if (self._model.isOver == false) {
                // 失败
                self._model.isOver = true;
                self._model.isWin = false;
                App.ViewManager.open(ViewConst.BattleLose, self._model);
            }
        }
        else {
            if (self._model.currScore >= self._model.targetScore) {
                // 胜利
                if (self._model.isOver == false) {
                    self._model.isOver = true;
                    self._model.isWin = true;
                    App.ViewManager.open(ViewConst.BattleWin, self._model);
                }
            }
        }
    };
    BattleMissionView.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        _super.prototype.close.call(this, param);
        var self = this;
        App.DisplayUtils.removeAllChildren(self);
    };
    return BattleMissionView;
}(BaseEuiView));
__reflect(BattleMissionView.prototype, "BattleMissionView");
//# sourceMappingURL=BattleMissionView.js.map