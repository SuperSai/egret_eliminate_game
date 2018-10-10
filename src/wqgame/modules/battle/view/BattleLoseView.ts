/**
 * 失败界面
 */
class BattleLoseView extends BaseEuiAlert {

	public txt_mission: eui.Label;
	public btn_again: eui.Group;
	public btn_exit: eui.Group;

	private _model: BattleModel;

	public constructor($controller: BaseController, $layer: number) {
		super($controller, $layer, SkinName.BattleLoseSkin);
		let self = this;
		self.isMaskTouch = false;
		self.setResources(["gameOver"]);
	}

	public open(...param: any[]): void {
		let self = this;
		self._model = param[0];
		self.txt_mission.text = App.LanguageManager.getLanguageText("battle.txt.01", self._model.enterMission);
	}

	public addEvents(): void {
		super.addEvents();
		let self = this;
		self.btn_again.addEventListener(egret.TouchEvent.TOUCH_TAP, self.onAgainHandler, self);
		self.btn_exit.addEventListener(egret.TouchEvent.TOUCH_TAP, self.onExitHandler, self);
		self.setBtnEffect(["btn_again", "btn_exit"])
	}

	public removeEvents(): void {
		super.removeEvents();
		let self = this;
		self.btn_again.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.onAgainHandler, self);
		self.btn_exit.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.onExitHandler, self);
	}

	/** 再来一次 */
	private onAgainHandler(): void {
		let self = this;
		App.ViewManager.close(ViewConst.BattleWinPanel);
		self._model.reset();
		App.ViewManager.open(ViewConst.BattleMission);
	}

	/** 退出 */
	private onExitHandler(): void {
		let self = this;
		App.ViewManager.close(ViewConst.BattleWinPanel);
		App.ViewManager.close(ViewConst.BattleMission);
	}
}