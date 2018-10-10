/**
 * 战斗关卡界面
 */
class BattleMissionView extends BaseEuiView {

	public btn_pause: eui.Button;
	public txt_score: eui.Label;//分数
	public txt_mission: eui.Label;//关卡
	public txt_step: eui.Label;//步数
	public txt_targetScore: eui.Label;

	private linePanel: egret.Sprite;
	private gridPanel: egret.Sprite;
	private state: BattleState = BattleState.Play;
	private pointLine: eui.Image;
	private pointLineBeganCell: Grid;// 提示点的起点cell
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
				let cell: Grid = BattleLogic.createGrid(this.gridPanel, i, j, id);
				cell.x = App.GridManager.getGridPosX(j);
				cell.y = App.GridManager.getGridPosY(i);
			}
		}
	}

	private initGridPanel() {
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

		let rect = new eui.Rect(this.gridPanel.width, this.gridPanel.height, 0x0000ff);
		rect.alpha = 0;
		this.gridPanel.addChild(rect);

		this.gridPanel.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegan, this);
		this.gridPanel.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
		this.gridPanel.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
		this.gridPanel.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onOutSide, this);
		this.addChild(this.gridPanel);
	}

	private initLinePanel() {
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
	}

	public open(...param: any[]): void {
		super.open(param);
		let self = this;
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
	}

	private onOutSide() {
		this.onTouchEnd();
	}

	private onTouchBegan(touch: egret.TouchEvent) {
		if (this.state == BattleState.Play) {
			BattleLogic.doTouchBegan(this.pointLine, this.linePanel, this.pointLineBeganCell, touch.stageX, touch.stageY);
		}
	}

	private onTouchMove(touch: egret.TouchEvent) {
		if (this.state == BattleState.Play) {
			BattleLogic.doTouchMove(this.pointLine, this.linePanel, this.pointLineBeganCell, touch.stageX, touch.stageY);
		}
	}

	private onTouchEnd() {
		// 判断消除
		let listLenght = App.GridManager.clearList.length;
		Log.trace("可以消除的数量为: " + listLenght);
		if (listLenght >= App.GridManager.baseCleanNum) {
			if (this.state == BattleState.Play) {
				this.state = BattleState.DealLogic;
				this.cleanOneByeOne();
			}
		}
		for (let k in App.GridManager.clearList) {
			let item: Grid = App.GridManager.clearList[k];
			item.selectState = false;
		}
		this.linePanel.removeChildren();
	}

	private cleanOneByeOne() {
		let len = App.GridManager.clearList.length;
		if (len == 0) {	// 清理完毕
			BattleLogic.deleteClearList();
			BattleLogic.dropAndFillGrid(this.gridPanel);
		} else {	// 清除下一个
			let item: Grid = App.GridManager.clearList[0];
			BattleLogic.createDirty(this.gridPanel, item);
			this.addScore(10, item);
			item.reset();
			// SoundsMgr.removeCell(this.cleanIndex);
			BattleLogic.cleanIndex++;
		}
	}

	private addScore(score: number, grid: Grid) {
		let self = this;
		self._model.currScore += score;
		self.txt_score.text = App.LanguageManager.getLanguageText("battle.txt.04", self._model.currScore);

		let scoreLabel = new eui.Label();
		scoreLabel.text = score.toString();
		scoreLabel.anchorOffsetX = scoreLabel.width / 2;
		scoreLabel.anchorOffsetY = scoreLabel.height / 2;
		scoreLabel.x = grid.x;
		scoreLabel.y = grid.y;
		self.gridPanel.addChild(scoreLabel);
		let tw2 = egret.Tween.get(scoreLabel);
		tw2.to({ y: grid.y - 40 }, 400)
			.call((node) => {
				egret.Tween.removeTweens(node);
				App.DisplayUtils.removeFromParent(node);
			}, self, [scoreLabel]);
	}

	private onGridDropComplete() {
		let isMove: boolean = App.GridManager.isAllMove();
		//没有移动的格子了
		if (!isMove) {
			this.state = BattleState.Play;
			this.checkStep();
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
				App.ViewManager.open(ViewConst.BattleLose, self._model);
			}
		} else {
			if (self._model.currScore >= self._model.targetScore) {
				// 胜利
				if (self._model.isOver == false) {
					self._model.isOver = true;
					self._model.isWin = true;
					App.ViewManager.open(ViewConst.BattleWin, self._model);
				}
			}
		}
	}

	public close(...param: any[]): void {
		super.close(param);
		let self = this;
		App.DisplayUtils.removeAllChildren(self);
	}

}