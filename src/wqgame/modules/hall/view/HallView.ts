/**
 * 大厅主界面
 */
class HallView extends BaseEuiView {

	public btn_map: eui.Group;
	public petGroup: eui.Group;
	public petPos: eui.Group;
	public headImg: eui.Image;
	public currency: CurrencyCom;

	private _model: HallModel;

	public constructor($controller: BaseController, $layer: number) {
		super($controller, $layer);
		let self = this;
		self.skinName = SkinName.HallViewSkin;
		self.setResources(["hall"]);
		self._model = <HallModel>self.controller.getModel();
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
	}

	public addEvents(): void {
		super.addEvents();
		let self = this;
		self.btn_map.addEventListener(egret.TouchEvent.TOUCH_TAP, self.onEnterMapView, self);
		self.setBtnEffect(["btn_map"]);
	}

	public removeEvents(): void {
		super.removeEvents();
		let self = this;
		self.btn_map.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.onEnterMapView, self);
	}

	/** 进入关卡选择地图 */
	private onEnterMapView(): void {
		let self = this;
		App.SceneManager.clear();
		App.SceneManager.runScene(SceneConsts.BATTLE);
	}
}