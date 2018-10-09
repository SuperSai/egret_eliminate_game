class Grid extends egret.Sprite {

	public static Width = 79;
	public static Height = 79;

	public id: number = 0;
	public row = 0;
	public column = 0;
	public moveFlag: boolean = false;
	public checkMark: boolean = false;// 检查标志
	public isSelected: boolean = false;
	private _icon: eui.Image;
	private isAction: boolean = false;
	private moveSpeed: number = 400;

	public constructor($id: number) {
		super();
		let self = this;
		self.id = $id;
		self._icon = new eui.Image();
		self.addEventListener(egret.Event.ADDED_TO_STAGE, self.onAddToStage, self);
	}

	private onAddToStage() {
		let self = this;
		self.init();
	}

	public init(): void {
		let self = this;
		let texture = RES.getRes("battle_icon_" + self.id);
		if (texture) {
			self._icon.source = texture;
			self._icon.width = self.width = Grid.Width;
			self._icon.height = self.height = Grid.Height;
			self._icon.anchorOffsetX = self.anchorOffsetX = self._icon.width << 1;
			self._icon.anchorOffsetY = self.anchorOffsetY = self._icon.height << 1;
			self._icon.x = self.width << 1;
			self._icon.y = self.height << 1;
		}
	}

	public set selectState(value: boolean) {
		let self = this;
		if (self.isSelected != value) {
			self.isSelected = value;
			if (value) {	// 选中状态
				self.doSelectedTween();
			} else {	// 非选中状态

			}
		}
	}

	/** 执行选择后的缓动处理 */
	private doSelectedTween(): void {
		let self = this;
		if (self.isAction == false) {
			self.isAction = true;
			// SoundsMgr.clickCell();
			egret.Tween.removeTweens(self);
			let tw = egret.Tween.get(self);
			tw.to({ scaleX: 0.8, scaleY: 1.3 }, 100, egret.Ease.bounceIn)
				.to({ scaleX: 1.1, scaleY: 1 }, 100, egret.Ease.bounceOut)
				.to({ scaleX: 1, scaleY: 1 }, 100, egret.Ease.backIn)
				.call(() => {
					self.isAction = false;
				}, self);
		}
	}

	/** 重置 */
	public reset(): void {
		let self = this;
		// Util.removeByElements(CellMgr.cleanList, this);
		// CellMgr.cleanCell(this);
		let tw = egret.Tween.get(self);
		tw.to({ scaleX: 0.4, scaleY: 0.4 }, 200)
			.call(() => {
				self.resetComplete();
			}, self)
			.wait(50)
			.call((args) => {
				if (self.parent) {
					self.parent.removeChild(self);
				} else {
					egret.log("no parent");
				}
			}, self, [self]);
	}

	/** 重置完毕 */
	private resetComplete(): void {
		// var event:GameEvent = new GameEvent(GameEvent.CleanOver);
		// this.dispatchEvent(event);
	}

	public drop(row: number, column: number) {
		let self = this;
		let gx = App.GridManager.getGridPosX(column);
		let gy = App.GridManager.getGridPosY(row);
		let dis = App.MathUtils.getDistance(self.x, self.y, gx, gy);
		let time = (dis / self.moveSpeed) * 1000;

		self.moveFlag = true;
		App.GridManager.setGrid(self, row, column);
		let tw = egret.Tween.get(self);
		tw.to({ x: gx, y: gy }, time, egret.Ease.bounceOut).call(function () {
			self.moveFlag = false;
			self.dropComplete();
		}, self);
	}

	private dropComplete() {
		// var event: GameEvent = new GameEvent(GameEvent.DropOver);
		// this.dispatchEvent(event);
	}

}