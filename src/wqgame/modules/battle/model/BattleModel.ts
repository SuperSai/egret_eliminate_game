class BattleModel extends BaseModel {

	//关卡表模板数据
	private _levelVO: LevelVO;

	public constructor($controller: BaseController) {
		super($controller)
		let self = this;
		self.init();
	}
	/** 初始化 */
	private init(): void {
		let self = this;
	}


	set levelVO(value: LevelVO) {
		this._levelVO = value;
	}
	/** 关卡表模板数据 */
	get levelVO(): LevelVO {
		return this._levelVO;
	}

}
