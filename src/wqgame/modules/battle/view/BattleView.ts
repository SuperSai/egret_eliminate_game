/**
 * 战斗界面
 */
class BattleView extends BaseEuiView {

	public map: BattleMap;	// 地图
	public currency: CurrencyCom; // 货币组件

	private _model: BattleModel;

	public constructor($controller: BaseController, $layer: number) {
		super($controller, $layer);
		let self = this;
		self.skinName = SkinName.BattleViewSkin;
		self.setResources(["battle"]);
	}

	/** 对面板进行显示初始化，用于子类继承 */
	public initUI(): void {
		super.initUI();
		let self = this;
		self.currency.initUI();
	}

	/** 对面板数据的初始化，用于子类继承 */
	public initData(): void {
		super.initData();
	}

	/** 面板开启执行函数，用于子类继承 */
	public open(...param: any[]): void {
		super.open(param);
		let self = this;
		self._model = <BattleModel>self.controller.getModel();
		//初始化地图数据
		self.map.open(self.controller);
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