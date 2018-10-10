/**
 * 胜利界面
 */
class BattleWinView extends BaseEuiAlert {

	public txt_mission: eui.Label;
	public btn_next: eui.Group;
	public btn_exit: eui.Group;

	private _model: BattleModel;

	public constructor($controller: BaseController, $layer: number) {
		super($controller, $layer, SkinName.BattleWinSkin);
		let self = this;
		self.isMaskTouch = false;
		self.setResources(["gameOver"]);
	}

	public open(...param: any[]): void {
		let self = this;
		self._model = param[0];
		self.txt_mission.text = App.LanguageManager.getLanguageText("battle.txt.01", self._model.enterMission);
		App.PlayerInfoManager.Info.saveMission(self._model.enterMission + 1);
		App.ControllerManager.applyFunc(ControllerConst.Battle, BattleConst.MAP_ITEM_UPDATE);
	}

	public addEvents(): void {
		super.addEvents();
		let self = this;
		self.btn_next.addEventListener(egret.TouchEvent.TOUCH_TAP, self.onNextMission, self);
		self.btn_exit.addEventListener(egret.TouchEvent.TOUCH_TAP, self.onExitHandler, self);
		self.setBtnEffect(["btn_next", "btn_exit"])
	}

	public removeEvents(): void {
		super.removeEvents();
		let self = this;
		self.btn_next.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.onNextMission, self);
		self.btn_exit.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.onExitHandler, self);
	}

	/** 进入下一关卡 */
	private onNextMission(): void {
		let self = this;
		App.ViewManager.close(ViewConst.BattleWinPanel);
		self._model.initMissionData(self._model.enterMission + 1);
		App.ViewManager.open(ViewConst.BattleMission);
	}

	/** 退出 */
	private onExitHandler(): void {
		let self = this;
		App.ViewManager.close(ViewConst.BattleWinPanel);
		App.ViewManager.close(ViewConst.BattleMission);
	}
}