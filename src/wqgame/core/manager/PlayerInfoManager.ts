/**
 * 人物信息管理类
 */
class PlayerInfoManager extends BaseClass {

	private _info: PlayerInfo;

	public constructor() {
		super();
	}

	public setup(): void {
		let self = this;
		self._info = new PlayerInfo();
	}



	set Info(value: PlayerInfo) {
		this._info = value;
	}
	/** 人物信息 */
	get Info(): PlayerInfo {
		return this._info;
	}
}