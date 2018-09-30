/**
 * 战斗地图
 */
class BattleMap extends BaseEuiView {

	public mapImg: eui.Image;

	private _model: BattleModel;
	private _battleController: BattleController;

	public constructor($controller: BaseController, $layer: number) {
		super($controller, $layer);
		this.skinName = SkinName.BattleMapSkin;
	}

	/** 面板开启执行函数，用于子类继承 */
	public open(...param: any[]): void {
		super.open(param);
		let self = this;
		self._battleController = param[0];
		self._model = <BattleModel>self._battleController.getModel();
		self.init();
		self.initMap();
		self.addEvents();
	}
	/** 初始化 */
	private init(): void {
		let self = this;
	}
	/** 初始化地图 */
	private initMap(): void {
		let self = this;
		let path: string = PathConfig.MapPath.replace("{0}", self._model.levelVO.icon + "");
		App.DisplayUtils.addAsyncBitmapToImage(path, self.mapImg);
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