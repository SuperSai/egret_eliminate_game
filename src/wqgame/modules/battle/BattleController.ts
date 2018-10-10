class BattleController extends BaseController {

	private _battleView: BattleView;
	private _battleModel: BattleModel;
	private _battleProxy: BattleProxy;

	public constructor() {
		super();
		let self = this;

		self._battleView = new BattleView(self, LayerManager.GAME_MAP_LAYER);
		App.ViewManager.register(ViewConst.Battle, self._battleView);

		self._battleModel = new BattleModel(self);
		self.setModel(self._battleModel);

		self._battleProxy = new BattleProxy(self);

		//注册模块消息
		self.registerFunc(BattleConst.BATTLE_INIT, self.onBattleInit, self);
		self.registerFunc(BattleConst.BATTLE_SELECT_LEVEL, self.onShowMissionPanel, self);
		self.registerFunc(BattleConst.BATTLE_ENTER_MISSION, self.onEnterBattleMission, self);
	}

	private onBattleInit(): void {
		let self = this;
		App.ViewManager.open(ViewConst.Battle);
		self.initRegisterView();
	}

	/** 注册界面才可以打开界面 */
	private initRegisterView(): void {
		let self = this;
		App.ViewManager.register(ViewConst.MissionPanel, new MissionPanel(self, LayerManager.GAME_UI_LAYER));
		App.ViewManager.register(ViewConst.BattleMission, new BattleMissionView(self, LayerManager.GAME_UI_LAYER));
		App.ViewManager.register(ViewConst.BattleWinPanel, new BattleWinView(self, LayerManager.GAME_UI_LAYER));
		App.ViewManager.register(ViewConst.BattleLosePanel, new BattleLoseView(self, LayerManager.GAME_UI_LAYER));
		App.ViewManager.register(ViewConst.BattlePausePanel, new BattlePausePanel(self, LayerManager.GAME_UI_LAYER));
	}

	/** 显示关卡面板 */
	private onShowMissionPanel(mission: number): void {
		let self = this;
		self._battleModel.initMissionData(mission);
		App.ViewManager.open(ViewConst.MissionPanel, mission);
	}

	/** 进入战斗关卡 */
	private onEnterBattleMission(): void {
		let self = this;
		App.ViewManager.close(ViewConst.MissionPanel);
		App.ViewManager.open(ViewConst.BattleMission);
	}

}