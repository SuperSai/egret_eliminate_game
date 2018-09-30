/**
 * json数据解析类
 */
class GlobleVOData extends egret.DisplayObject {

	private _hasParasComplete: boolean = false;
	private _totalStepCsvList: TSDictionary<string, any> = new TSDictionary<string, any>();
	private _needParseCount: number = 0;
	private _currParseCount: number = 0;
	private _csvZipData: JSZip;
	private static AllCacheData: TSDictionary<string, TSDictionary<number, any>> = new TSDictionary<string, TSDictionary<number, any>>();

	public get hasParasComplete(): boolean {
		return this._hasParasComplete;
	}

	public setup(): void {
		let self = this;
		self.initModel();
		self.initStep();
	}

	public static ServerConfigVO: string = "ServerConfig_json";
	public static BoneAnimationVO: string = "BoneAnimation_json";
	public static LevelVO: string = "Level_json";
	public static SoundVO: string = "Sound_json";
	public static MonsterVO: string = "Monster_json";
	public static HeroVO: string = "Hero_json";
	public static BulletVO: string = "Bullet_json";

	private initModel(): void {
		let self = this;
		self._totalStepCsvList.Add(GlobleVOData.LevelVO, LevelVO);
		self._totalStepCsvList.Add(GlobleVOData.BoneAnimationVO, BoneAnimationVO);
		self._totalStepCsvList.Add(GlobleVOData.SoundVO, SoundVO);
		self._totalStepCsvList.Add(GlobleVOData.MonsterVO, MonsterVO);
		self._totalStepCsvList.Add(GlobleVOData.ServerConfigVO, ServerConfigVO);
		self._totalStepCsvList.Add(GlobleVOData.HeroVO, HeroVO);
		self._totalStepCsvList.Add(GlobleVOData.BulletVO, BulletVO);
	}

	// 解析初始数据表
	private initStep(): void {
		let self = this;
		self._needParseCount = self._totalStepCsvList.GetLenght();
		RES.getResAsync("json_zip", this.onloadDataComplete, self);
		Log.trace("dataFile is json_zip");
	}
	private onloadDataComplete(data: any, key: string): void {
		let self = this;
		self._csvZipData = new JSZip(data);
		Log.trace("onloadDataComplete is json_zip:" + key);
		self.addEventListener(egret.Event.ENTER_FRAME, self.onEnterFrameLoader, self);
	}

	private onEnterFrameLoader(): void {
		let self = this;
		if (self._currParseCount >= self._needParseCount) {
			self.removeEventListener(egret.Event.ENTER_FRAME, self.onEnterFrameLoader, self);
			this._hasParasComplete = true;
			App.GameEnterManager.init();
		}
		else {
			//一次解析两个文件
			self.getCsvFile();
			self.getCsvFile();
		}
	}

	private getCsvFile(): void {
		let self = this;
		if (self._currParseCount < self._needParseCount) {
			let key: string = self._totalStepCsvList.getKeyByIndex(self._currParseCount);
			key = key.replace('_', '.');
			let data: any = self._csvZipData.file(key);
			if (data == null) {
				Log.trace("can't get key from key :" + key);
			}
			let csvStr: string = self._csvZipData.file(key).asText();
			self.starSingleParse(csvStr);
		}
	}

	private starSingleParse(csvStr: string): void {
		let self = this;
		let key: string = self._totalStepCsvList.getKeyByIndex(self._currParseCount);
		let DataClass: any = self._totalStepCsvList.getValueByIndex(self._currParseCount);
		let dic: TSDictionary<number, any> = CSVParser.ParseJsonData(DataClass, csvStr);
		GlobleVOData.AllCacheData.Add(key, dic);
		self._currParseCount++;
	}

	private static _instance: GlobleVOData;
	public constructor() { super(); }
	public static get getInstance(): GlobleVOData {
		if (!this._instance) {
			this._instance = new GlobleVOData();
		}
		return this._instance;
	}

	public static getData(type: string, key: number): any {
		let dic: TSDictionary<number, any> = GlobleVOData.AllCacheData.TryGetValue(type);
		return dic.TryGetValue(key);
	}

	public static getDataByFilter(type: string, filterType: any, filterValue: any): any[] {
		let dic: TSDictionary<number, any> = GlobleVOData.AllCacheData.TryGetValue(type);
		let filterd: any[] = dic.TryGetListByCondition((bean) => bean[filterType] == filterValue);
		return filterd
	}

	public static getAllValue(type: string): Array<any> {
		let dic: TSDictionary<number, any> = GlobleVOData.AllCacheData.TryGetValue(type);
		return dic.getValues();
	}

	public static getDataByCondition(type: string, value: (value: any) => boolean): Array<any> {
		let dic: TSDictionary<number, any> = GlobleVOData.AllCacheData.TryGetValue(type);
		let arr: any[] = dic.TryGetListByCondition(value);
		return arr;
	}
}