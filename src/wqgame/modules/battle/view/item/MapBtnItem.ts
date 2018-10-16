class MapBtnItem extends BaseEuiItem {

	public btn_level: eui.Group;
	public txt_index: eui.Label;
	public itemImg: eui.Image;
	public headImg: eui.Image;

	private _mapIndex: number;
	private _model: BattleModel;
	public isPass: boolean;

	public constructor() {
		super(SkinName.MapBtnItemSkin);
	}

	public onAwake($data: any): void {
		super.onAwake($data);
		let self = this;
		self.init();
		self.initState();
		self.initPosition();
		self.initHeadState();
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
		self.isPass = true;
		if (parseInt(self.txt_index.text) == App.PlayerInfoManager.Info.data.topMission) {	//当前最高可以打的关卡
			self.itemImg.source = "battle_red";
		} else if (parseInt(self.txt_index.text) < App.PlayerInfoManager.Info.data.topMission) {	//所以已经通关的关卡
			self.itemImg.source = "battle_green";
		} else {	//没有通关的关卡
			self.isPass = false;
			self.itemImg.source = "battle_black";
		}
	}

	private initHeadState(): void {
		let self = this;
		if (parseInt(self.txt_index.text) == App.PlayerInfoManager.Info.data.topMission) {
			self.headImg.visible = true;
			self.headImg.scaleX = self.headImg.scaleY = 1;
		}
		else {
			self.headImg.visible = false;
			self.headImg.scaleX = self.headImg.scaleY = 0;
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
		if (self.isPass) {
			App.ControllerManager.applyFunc(ControllerConst.Battle, BattleConst.BATTLE_SELECT_LEVEL, parseInt(self.txt_index.text));
			return;
		}
		App.MessageManger.showText(App.LanguageManager.getLanguageText("battle.txt.02"));
	}

	public headState(isShow: boolean, callBack: Function): void {
		let self = this;
		egret.Tween.removeTweens(self.headImg);
		if (isShow) {
			self.headImg.visible = true;
			egret.Tween.get(self.headImg).to({ scaleX: 1, scaleY: 1 }, 300).call(() => {
				if (callBack) callBack();
			}, self);
		}
		else {
			egret.Tween.get(self.headImg).to({ scaleX: 0, scaleY: 0 }, 300).call(() => {
				self.headImg.visible = false;
				if (callBack) callBack();
			}, self);
		}
	}
}