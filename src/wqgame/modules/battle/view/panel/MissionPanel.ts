/**
 *  关卡面板
 */
class MissionPanel extends BaseEuiAlert {

	public txt_title: eui.Label;
	public btn_start: eui.Group;
	public txt_condition: eui.Label;

	private _mission: number;
	private _model: BattleModel;

	public constructor($controller: BaseController, $layer: number) {
		super($controller, $layer, SkinName.MissionPanelSkin);
		let self = this;
		self._model = <BattleModel>self.controller.getModel();
		self.cacheAsBitmap = true;
	}


	public initData(): void {
		super.initData();
		let self = this;
		self.txt_title.text = App.LanguageManager.getLanguageText("battle.txt.01", self._model.enterMission);
		self.txt_condition.text = App.LanguageManager.getLanguageText("battle.txt.05", self._model.targetScore);
	}

	public addEvents(): void {
		super.addEvents();
		let self = this;
		self.btn_start.addEventListener(egret.TouchEvent.TOUCH_TAP, self.onEnterBattleMission, self);
		self.setBtnEffect(["btn_start", "btn_close"]);
	}

	public removeEvents(): void {
		super.removeEvents();
		let self = this;
		self.btn_start.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.onEnterBattleMission, self);
	}

	/** 进入战斗关卡 */
	private onEnterBattleMission(): void {
		let self = this;
		self.applyFunc(BattleConst.BATTLE_ENTER_MISSION);
	}
}