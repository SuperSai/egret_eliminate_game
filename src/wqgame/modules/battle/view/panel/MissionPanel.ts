/**
 *  关卡面板
 */
class MissionPanel extends BaseEuiAlert {

	public txt_title: eui.Label;
	public btn_start: eui.Group;

	private _mission: number;

	public constructor($controller: BaseController, $layer: number) {
		super($controller, $layer, SkinName.MissionPanelSkin);
	}

	public open(...param: any[]): void {
		let self = this;
		self._mission = param[0];
		self.txt_title.text = App.LanguageManager.getLanguageText("battle.txt.01", self._mission);
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
		self.applyFunc(BattleConst.BATTLE_ENTER_MISSION, self._mission);
	}
}