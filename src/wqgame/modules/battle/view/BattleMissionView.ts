/**
 * 战斗关卡界面
 */
class BattleMissionView extends BaseEuiView {

	public btn_pause: eui.Button;
	public txt_score: eui.Label;//分数
	public txt_mission: eui.Label;//关卡
	public txt_step: eui.Label;//步数
	public txt_targetScore: eui.Label;

	private _linePanel: egret.Sprite;
	private _gridPanel: egret.Sprite;
	private _state: BattleState = BattleState.Play;
	private _line: eui.Image;
	private _beganCell: Grid;// 提示点的起点cell
	private _model: BattleModel;

	public constructor($controller: BaseController, $layer: number) {
		super($controller, $layer);
		let self = this;
		self.skinName = SkinName.BattleMissionViewSkin;
		self.setResources(["battleMission"]);
		self._model = <BattleModel>self.controller.getModel();
	}

	public initUI(): void {
		super.initUI();
		let self = this;
		this.initLinePanel();
		this.initGridPanel();
		this.initCell();
	}

	public initData(): void {
		super.initData();
		let self = this;
		self.txt_mission.text = self._model.enterMission + "";
		self.txt_step.text = self._model.totalStep + "";
		self.txt_score.text = App.LanguageManager.getLanguageText("battle.txt.04", self._model.currScore);
		self.txt_targetScore.text = App.LanguageManager.getLanguageText("battle.txt.03", self._model.targetScore);
	}

	private initCell(): void {
		App.GridManager.clearList = [];
		App.GridManager.cleanGridArray();
		for (let i = 0; i < App.GridManager.row; i++) {
			for (let j = 0; j < App.GridManager.column; j++) {
				let id = App.GridManager.genInitGridId(i, j);
				let cell: Grid = BattleLogic.createGrid(this._gridPanel, i, j, id);
				cell.x = App.GridManager.getGridPosX(j);
				cell.y = App.GridManager.getGridPosY(i);
			}
		}
	}

	private initGridPanel() {
		let self = this;
		if (self._gridPanel) {
			App.DisplayUtils.removeAllChildren(self._gridPanel);
		}
		self._gridPanel = new egret.Sprite();
		self._gridPanel.width = App.GridManager.column * Grid.Width + (App.GridManager.column - 1) * App.GridManager.columnSpace;
		self._gridPanel.height = App.GridManager.row * Grid.Height + (App.GridManager.row - 1) * App.GridManager.rowSpace;
		self._gridPanel.anchorOffsetX = self._gridPanel.width / 2;
		self._gridPanel.anchorOffsetY = self._gridPanel.height;
		self._gridPanel.x = App.StageUtils.getWidth() / 2;
		self._gridPanel.y = App.StageUtils.getHeight() / 2 + 200;

		let rect = new eui.Rect(self._gridPanel.width, self._gridPanel.height, 0x0000ff);
		rect.alpha = 0;
		self._gridPanel.addChild(rect);

		self._gridPanel.addEventListener(egret.TouchEvent.TOUCH_BEGIN, self.onTouchBegan, self);
		self._gridPanel.addEventListener(egret.TouchEvent.TOUCH_MOVE, self.onTouchMove, self);
		self._gridPanel.addEventListener(egret.TouchEvent.TOUCH_END, self.onTouchEnd, self);
		self._gridPanel.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, self.onOutSide, self);
		self.addChild(self._gridPanel);
	}

	private initLinePanel() {
		let self = this;
		if (self._linePanel) {
			App.DisplayUtils.removeAllChildren(self._linePanel);
		}
		self._linePanel = new egret.Sprite();
		self._linePanel.width = App.GridManager.column * Grid.Width + (App.GridManager.column - 1) * App.GridManager.columnSpace;
		self._linePanel.height = App.GridManager.row * Grid.Height + (App.GridManager.row - 1) * App.GridManager.rowSpace;
		self._linePanel.anchorOffsetX = self._linePanel.width / 2;
		self._linePanel.anchorOffsetY = self._linePanel.height;
		self._linePanel.x = App.StageUtils.getWidth() / 2;
		self._linePanel.y = App.StageUtils.getHeight() / 2 + 200;

		self._linePanel.graphics.beginFill(0x00ff00, 0);
		self._linePanel.graphics.drawRect(0, 0, self._linePanel.width, self._linePanel.height);
		self._linePanel.graphics.endFill();

		self.addChild(self._linePanel);
	}

	public addEvents(): void {
		super.addEvents();
		let self = this;
		self.btn_pause.addEventListener(egret.TouchEvent.TOUCH_TAP, self.onPauseHandler, self);
		self.setBtnEffect(["btn_pause"]);
		self.registerFunc(BattleConst.GRID_RESET_COMPLETE, self.cleanOneByeOne, self);
		self.registerFunc(BattleConst.GRID_DROP_COMPLETE, self.onGridDropComplete, self);
	}

	public removeEvents(): void {
		super.removeEvents();
		let self = this;
		self.btn_pause.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.onPauseHandler, self);
	}

	private onPauseHandler(): void {
		let self = this;
		App.ViewManager.open(ViewConst.BattlePausePanel);
	}

	private onOutSide() {
		this.onTouchEnd();
	}

	private onTouchBegan(touch: egret.TouchEvent) {
		let self = this;
		if (self._state == BattleState.Play) {
			BattleLogic.doTouchBegan(self._line, self._linePanel, self._beganCell, touch.stageX, touch.stageY);
		}
	}

	private onTouchMove(touch: egret.TouchEvent) {
		let self = this;
		if (self._state == BattleState.Play) {
			BattleLogic.doTouchMove(self._line, self._linePanel, self._beganCell, touch.stageX, touch.stageY);
		}
	}

	private onTouchEnd() {
		let self = this;
		// 判断消除
		let listLenght = App.GridManager.clearList.length;
		Log.trace("可以消除的数量为: " + listLenght);
		if (listLenght >= App.GridManager.baseCleanNum) {
			if (self._state == BattleState.Play) {
				self._state = BattleState.DealLogic;
				self.cleanOneByeOne();
			}
		}
		for (let k in App.GridManager.clearList) {
			let item: Grid = App.GridManager.clearList[k];
			item.selectState = false;
		}
		self._linePanel.removeChildren();
	}

	private cleanOneByeOne() {
		let self = this;
		let len = App.GridManager.clearList.length;
		if (len == 0) {	// 清理完毕
			BattleLogic.deleteClearList();
			BattleLogic.dropAndFillGrid(self._gridPanel);
		} else {	// 清除下一个
			let item: Grid = App.GridManager.clearList[0];
			BattleLogic.createDirty(self._gridPanel, item);
			self.addScore(10, item);
			item.reset();
			// SoundsMgr.removeCell(this.cleanIndex);
			BattleLogic.cleanIndex++;
		}
	}

	private addScore(score: number, grid: Grid) {
		let self = this;
		self._model.currScore += score;
		self.txt_score.text = App.LanguageManager.getLanguageText("battle.txt.04", self._model.currScore);
		//分数
		let scoreLabel = ObjectPool.pop(eui.Label, "eui.Label");
		scoreLabel.text = score.toString();
		scoreLabel.anchorOffsetX = scoreLabel.width / 2;
		scoreLabel.anchorOffsetY = scoreLabel.height / 2;
		scoreLabel.x = grid.x;
		scoreLabel.y = grid.y;
		self._gridPanel.addChild(scoreLabel);
		let tw2 = egret.Tween.get(scoreLabel);
		tw2.to({ y: grid.y - 40 }, 400)
			.call((node) => {
				egret.Tween.removeTweens(node);
				App.DisplayUtils.removeFromParent(node);
			}, self, [scoreLabel]);
	}

	/** 格子掉落完成 */
	private onGridDropComplete() {
		let self = this;
		let isMove: boolean = App.GridManager.isAllMove();
		//没有移动的格子了
		if (!isMove) {
			self._state = BattleState.Play;
			self.checkStep();
		}
	}

	/** 检查步数 */
	private checkStep() {
		let self = this;
		self._model.currStep--;
		this.txt_step.text = self._model.currStep.toString();
		if (self._model.currStep <= 0) {
			self._model.currStep = 0;
			if (self._model.isOver == false) {
				// 失败
				self._model.isOver = true;
				self._model.isWin = false;
				App.ViewManager.open(ViewConst.BattleLosePanel, self._model);
			}
		} else {
			if (self._model.currScore >= self._model.targetScore) {
				// 胜利
				if (self._model.isOver == false) {
					self._model.isOver = true;
					self._model.isWin = true;
					App.ViewManager.open(ViewConst.BattleWinPanel, self._model);
				}
			}
		}
	}

	public close(...param: any[]): void {
		super.close(param);
		let self = this;
		self._beganCell = null;
		self._state = BattleState.Play;
		App.DisplayUtils.removeFromParent(self._line);
		App.DisplayUtils.removeFromParent(self._linePanel);
		App.DisplayUtils.removeFromParent(self._gridPanel);
	}

}