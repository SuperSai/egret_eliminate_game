class MapBtnItem extends BaseEuiItem {

	public btn_level: eui.Group;
	public itemImg: eui.Image;
	public txt_index: eui.Label;

	private _mapIndex: number;
	private _model: BattleModel;
	public isListener: boolean;

	public constructor() {
		super(SkinName.MapBtnItemSkin);
	}


	public onAwake($data: any): void {
		super.onAwake($data);
		let self = this;
		self.init();
		self.initState();
		self.initPosition();
		self.addEvents();
	}

	/** 初始化 */
	private init(): void {
		let self = this;
		self._mapIndex = self.data[0];
		self._model = self.data[4];
		self.txt_index.text = self._mapIndex * 2 * 10 + self.data[1] + "";
	}

	/** 初始化位置 */
	private initPosition(): void {
		let self = this;
		self.x = self.data[2];
		self.y = self.data[3];
	}

	/** 初始化状态 */
	public initState(): void {
		let self = this;
		self.isListener = true;
		if (parseInt(self.txt_index.text) == App.PlayerInfoManager.Info.data.topMission) {	//当前最高可以打的关卡
			self.itemImg.source = "battle_red";
		} else if (parseInt(self.txt_index.text) < App.PlayerInfoManager.Info.data.topMission) {	//所以已经通关的关卡
			self.itemImg.source = "battle_green";
		} else {	//没有通关的关卡
			self.isListener = false;
			self.itemImg.source = "battle_black";
		}
	}

	public addEvents(): void {
		let self = this;
		self.btn_level.addEventListener(egret.TouchEvent.TOUCH_TAP, self.onSelectLevel, self);
		self.setBtnEffect(["btn_level"]);
	}


	public removeEvents(): void {
		super.removeEvents();
		let self = this;
		self.btn_level.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.onSelectLevel, self);
	}

	/** 选择关卡 */
	private onSelectLevel(): void {
		let self = this;
		if (self.isListener) {
			App.ControllerManager.applyFunc(ControllerConst.Battle, BattleConst.BATTLE_SELECT_LEVEL, parseInt(self.txt_index.text));
			return;
		}
		App.MessageManger.showText(App.LanguageManager.getLanguageText("battle.txt.02"));
	}
}