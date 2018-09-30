/**
 * 场景管理类
 */
class SceneManager extends BaseClass {
	private _scenes: TSDictionary<number, BaseScene>;
	private _currScene: number;

    /**
     * 构造函数
     */
	public constructor() {
		super();
		this._scenes = new TSDictionary<number, BaseScene>();
	}

    /**
     * 清除当前场景
     */
	public clear(): void {
		var nowScene: BaseScene = this._scenes.TryGetValue(this._currScene);
		if (nowScene) {
			nowScene.onExit();
			this._currScene = undefined;
		}
		this._scenes.Remove(this._currScene);
	}

    /**
     * 注册Scene
     * @param key Scene唯一标识
     * @param scene Scene对象
     */
	public register(key: number, scene: BaseScene): void {
		this._scenes.Add(key, scene)
	}

    /**
     * 切换场景
     * @param key 场景唯一标识
	 * @param isClear 是否清除上一个场景
     */
	public runScene(key: number, ...param: any[]): void {
		var nowScene: BaseScene = this._scenes.TryGetValue(key);
		if (nowScene == null) {
			Log.trace("场景" + key + "不存在");
			return;
		}

		// var oldScene: BaseScene = this._scenes.TryGetValue(this._currScene);
		// if (oldScene) {
		// 	oldScene.onExit();
		// }

		nowScene.onEnter.apply(nowScene, param);
		this._currScene = key;
	}

    /**
     * 获取当前Scene
     * @returns {number}
     */
	public getCurrScene(): number {
		return this._currScene;
	}
}
