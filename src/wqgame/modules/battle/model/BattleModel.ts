class BattleModel extends BaseModel {

	/** 总地图数量 */
	public maxMapCount: number = 15;
	/** 开放的地图数量 */
	public openMapCount: number = 2;
	/** 当前进入关卡 */
	public enterMission: number = 0;
	/** 当前步数 */
	public currStep: number = 0;
	/** 总步数 */
	public totalStep: number = 0;
	/** 当前分数 */
	public currScore: number = 0;
	/** 目标分数 */
	public targetScore: number = 0;
	/** 是否结束 */
	public isOver: boolean = false;
	/** 是否通关 */
	public isWin: boolean = false;

	public mapItemDic: TSDictionary<number, MapBtnItem>;

	public constructor($controller: BaseController) {
		super($controller)
		let self = this;
		self.init();
	}
	/** 初始化 */
	private init(): void {
		let self = this;
		self.mapItemDic = new TSDictionary<number, MapBtnItem>();
		self.maxMapCount = parseInt(GlobleVOData.getDataByFilter(GlobleVOData.ServerConfigVO, "id", "MAX_MAP_COUNT")[0].value);
	}

	public initMissionData(mission: number) {
		let self = this;
		this.reset();
		var vo: LevelVO = GlobleVOData.getData(GlobleVOData.LevelVO, mission);
		if (vo) {
			self.targetScore = vo.score;
			self.totalStep = vo.step;
			self.currStep = self.totalStep;
			self.enterMission = mission;
		}
	}

	public getMapIndex(mission: number): number {
		let self = this;
		for (let i: number = 0; i < self.openMapCount; i++) {
			let value: number = mission - i * 2 * 10;
			let value2: number = i * 2 * 10 + value;
			if (value2 == mission) {
				return i + 1;
			}
		}
		return 0;
	}

	public reset() {
		this.enterMission = 0;
		this.currStep = 0;
		this.totalStep = 0;
		this.currScore = 0;
		this.targetScore = 0;
		this.isOver = false;
		this.isWin = false;
	}
}

enum BattleState {
	DealLogic,
	Play
}
