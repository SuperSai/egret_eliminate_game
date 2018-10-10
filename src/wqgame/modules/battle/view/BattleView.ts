/**
 * 战斗界面
 */
class BattleView extends BaseEuiView {

	public scroller: eui.Scroller;
	public currency: CurrencyCom; // 货币组件

	public map: BattleMap;	// 地图
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
		self.map = new BattleMap(self.controller, LayerManager.GAME_MAP_LAYER);
		self.scroller.viewport = self.map.container;
		self.map.addToParent();
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
		self.scroller.validateNow();
		self.scroller.viewport.scrollV = self.scroller.viewport.contentHeight - self.scroller.viewport.height;
	}

	public addEvents(): void {
		super.addEvents();
		let self = this;
		self.scroller.addEventListener(egret.Event.CHANGE, self.onMapChange, self);
		self.registerFunc(BattleConst.MAP_ITEM_UPDATE, self.onUpdateMapItem, self);
	}

	public removeEvents(): void {
		super.removeEvents();
		let self = this;
		self.scroller.removeEventListener(egret.Event.CHANGE, self.onMapChange, self);
	}

	private onMapChange(): void {
		let self = this;
		//已经滑动到顶部
		if (self.scroller.viewport.scrollV == 0) {
			self.map.addMap();
			self.scroller.viewport.validateNow();
		}
	}

	/** 更新地图Item数据 */
	private onUpdateMapItem(): void {
		let self = this;
		(<MapBtnItem>self._model.mapItemDic.TryGetValue(App.PlayerInfoManager.Info.data.topMission)).initState();
		(<MapBtnItem>self._model.mapItemDic.TryGetValue(App.PlayerInfoManager.Info.data.topMission - 1)).initState();
	}
}