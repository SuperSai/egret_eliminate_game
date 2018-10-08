/**
 * 战斗关卡界面
 */
class BattleMissionView extends BaseEuiView {

	public constructor($controller: BaseController, $layer: number) {
		super($controller, $layer);
		let self = this;
		self.skinName = SkinName.BattleMissionViewSkin;
		// self.setResources(["battle"]);
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

	}

	public addEvents(): void {
		super.addEvents();
		let self = this;
	}

	public removeEvents(): void {
		super.removeEvents();
		let self = this;
	}
}