/**
 * 战斗地图
 */
class BattleMap extends BaseEuiView {

	public container: eui.Group;
	public mapGroup: eui.Group;

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
		for (let i: number = self._model.openMapCount; i > 0; i--) {
			let mapCon: eui.Group = self.createMap(i);
			self.initLevel(mapCon, i);
			self.mapGroup.addChild(mapCon);
		}
	}

	/** 初始化关卡 */
	private initLevel(mapCon: eui.Group, index: number): void {
		let self = this;
		let posList: any[] = [[588, 1060], [424, 1064], [311, 1162]];
		for (let i: number = 0; i < posList.length; i++) {
			let levelItem: MapBtnItem = ObjectPool.pop(MapBtnItem, "MapBtnItem");
			levelItem.anchorOffsetX = 45;
			levelItem.anchorOffsetY = 45;
			levelItem.onAwake([index - 1, i + 1, posList[i][0], posList[i][1], self._model]);
			mapCon.addChild(levelItem);
		}
	}

	/** 添加新地图 */
	public addMap(): void {
		let self = this;
		if (self._model.openMapCount < self._model.maxMapCount) {
			self._model.openMapCount++;
			let mapCon: eui.Group = self.createMap(self._model.openMapCount);
			self.initLevel(mapCon, self._model.openMapCount);
			self.mapGroup.addChildAt(mapCon, 0);
		}
	}

	/** 创建地图 */
	private createMap(index: number): eui.Group {
		let self = this;
		let mapCon: eui.Group = ObjectPool.pop(eui.Group, "eui.Group");
		mapCon.width = 720, mapCon.height = 1280;
		let mapIcon: eui.Image = ObjectPool.pop(eui.Image, "eui.Image");
		let path: string = PathConfig.MapPath.replace("{0}", index > 9 ? "100" + index : "1000" + index);
		App.DisplayUtils.addAsyncBitmapToImage(path, mapIcon);
		mapCon.addChild(mapIcon);
		return mapCon;
	}

	public addEvents(): void {
		super.addEvents();
		let self = this;
		// App.StageUtils.getStage().addEventListener(egret.TouchEvent.TOUCH_TAP, self.onGetMapPos, self);
	}

	public removeEvents(): void {
		super.removeEvents();
		let self = this;
	}

	private onGetMapPos(evt: egret.TouchEvent): void {
		Log.trace(evt.stageX + "," + evt.stageY);
	}
}