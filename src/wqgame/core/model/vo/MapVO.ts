class MapVO {

	public mapId: number;
	public icon: number;

	private _path: string[];
	set path(value) {
		this._path = ObjectUtils.splitToString(value, "#");
	}
	/** 地图行走路径 */
	get path(): string[] {
		return this._path;
	}
}