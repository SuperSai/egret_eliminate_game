class MapBtnItem extends BaseEuiItem {

	public itemImg: eui.Image;
	public txt_index: eui.Label;

	private _mapIndex: number;

	public constructor() {
		super(SkinName.MapBtnItemSkin);
	}


	public onAwake($data: any): void {
		super.onAwake($data);
		let self = this;
		self.init();
		self.initPosition();
		self.addEvents();
	}

	/** 初始化 */
	private init(): void {
		let self = this;
		self._mapIndex = self.data[0];
		self.txt_index.text = self._mapIndex * 2 * 10 + self.data[1] + "";
	}

	/** 初始化位置 */
	private initPosition(): void {
		let self = this;
		self.x = self.data[2];
		self.y = self.data[3];
	}

	public addEvents(): void {
		let self = this;
		self.addEventListener(egret.TouchEvent.TOUCH_TAP, self.onSelectLevel, self);
	}


	public removeEvents(): void {
		super.removeEvents();
		let self = this;
		self.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.onSelectLevel, self);
	}

	/** 选择关卡 */
	private onSelectLevel(): void {
		let self = this;
		App.ControllerManager.applyFunc(ControllerConst.Battle, BattleConst.BATTLE_SELECT_LEVEL, self._mapIndex);
	}

}