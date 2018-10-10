class PlayerInfo {

	public data = { topMission: 1, gold: 0, heart: 0 };

	public saveMission(mission: number) {
		if (mission >= this.data.topMission) {
			this.data.topMission = mission;
		}
		this.save();
	}

	public initData() {
		var localData = egret.localStorage.getItem("gameLocalData");
		if (localData) {
			this.data = JSON.parse(localData);
		}
	}

	private save() {
		var s = JSON.stringify(this.data);
		egret.localStorage.setItem("gameLocalData", s);
	}
}