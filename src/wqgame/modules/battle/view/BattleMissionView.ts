/**
 * 战斗关卡界面
 */
class BattleMissionView extends BaseEuiView {

	public btn_pause: eui.Button;
	public txt_score: eui.Label;//分数
	public txt_mission: eui.Label;//关卡
	public txt_step: eui.Label;//步数

	public constructor($controller: BaseController, $layer: number) {
		super($controller, $layer);
		let self = this;
		self.skinName = SkinName.BattleMissionViewSkin;
		self.setResources(["battleMission"]);
	}

	public initUI(): void {
		super.initUI();
		let self = this;

	}

	public initData(): void {
		super.initData();
	}

	public open(...param: any[]): void {
		super.open(param);
		let self = this;
		self.txt_mission.text = param[0] + "";
	}

	public addEvents(): void {
		super.addEvents();
		let self = this;
		self.btn_pause.addEventListener(egret.TouchEvent.TOUCH_TAP, self.onPauseHandler, self);
		self.setBtnEffect(["btn_pause"]);
	}

	public removeEvents(): void {
		super.removeEvents();
		let self = this;
		self.btn_pause.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.onPauseHandler, self);
	}

	private onPauseHandler(): void {
		let self = this;
	}
}