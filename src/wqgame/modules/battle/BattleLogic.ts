class BattleLogic {

	public static cleanIndex = 0;

	public static pushClearGrid($grid: Grid, linePanel: egret.Sprite) {
		App.GridManager.clearList.push($grid);
		let length = App.GridManager.clearList.length;
		if (length > 1) {
			let fromGrid = App.GridManager.clearList[length - 2];
			BattleLogic.drawLine(linePanel, fromGrid, $grid);
			// 提示线更新起点
		}
	}

	/** 创建格子 */
	public static createGrid(gridPanel: egret.Sprite, row: number, column: number, id: number): Grid {
		let grid = ObjectPool.pop(Grid, "Grid", id);
		grid.row = row;
		grid.column = column;
		App.GridManager.gridArray[row][column] = grid;
		gridPanel.addChild(grid);
		return grid;
	}

	/** 创建格子和格子之间的线 */
	public static createPointLine(pointLine: eui.Image, linePanel: egret.Sprite, pos: egret.Point) {
		if (pointLine) {
			if (pointLine.parent) {
				App.DisplayUtils.removeFromParent(pointLine);
			}
		}
		pointLine = ObjectPool.pop(eui.Image, "eui.Image");
		pointLine.texture = RES.getRes("line_png");
		pointLine.width = 0;
		pointLine.anchorOffsetX = 0;
		pointLine.anchorOffsetY = pointLine.height / 2;
		pointLine.x = pos.x;
		pointLine.y = pos.y;
		linePanel.addChild(pointLine);
	}

	public static deleteClearList() {
		App.GridManager.clearList = [];
		App.GridManager.lineArray = [];
		this.cleanIndex = 0;
	}

	public static dropAndFillGrid(gridPanel: egret.Sprite) {
		// 下落
		for (let i = App.GridManager.row - 1; i >= 0; i--) {
			for (let j = 0; j < App.GridManager.column; j++) {
				let item: Grid = App.GridManager.gridArray[i][j];
				if (item != null) {
					let ret = App.GridManager.getDropRowAndColumn(item);
					let row = ret.row;
					let column = ret.column;
					if (item.row != row || item.column != column) {
						item.drop(ret.row, ret.column);
					}
				}
			}
		}
		// 填充
		let emptyPosArr = App.GridManager.getEmptyGrid();
		for (let k in emptyPosArr) {
			let emptyRow = emptyPosArr[k].row;
			let emptyColumn = emptyPosArr[k].column;
			let id = App.GridManager.genDropGridId(emptyRow, emptyColumn);
			let grid: Grid = BattleLogic.createGrid(gridPanel, emptyRow, emptyColumn, id);
			grid.x = App.GridManager.getGridPosX(emptyColumn);
			grid.y = -Grid.Height / 2;
			grid.drop(emptyRow, emptyColumn);
		}
	}

	public static createDirty(gridPanel: egret.Sprite, $grid: Grid) {
		// 痕迹
		let dirty = ObjectPool.pop(eui.Image, "eui.Image", "battle_icon_" + $grid.id);// new eui.Image("battle_icon_" + $grid.id);
		let texture = RES.getRes("battle_icon_" + $grid.id);
		dirty.anchorOffsetX = texture.textureWidth / 2;
		dirty.anchorOffsetY = texture.textureHeight / 2;
		dirty.x = $grid.x;
		dirty.y = $grid.y;
		dirty.scaleX = dirty.scaleY = 0;
		let rotation = Math.random() * 360;
		dirty.rotation = rotation;
		gridPanel.addChild(dirty);

		let tw = egret.Tween.get(dirty);
		tw.to({ scaleX: 1.2, scaleY: 1.2 }, 400, egret.Ease.bounceOut)
			.wait(200)
			.to({ alpha: 0 }, 100)
			.call((node) => {
				egret.Tween.removeTweens(node);
				App.DisplayUtils.removeFromParent(node);
			}, this, [dirty]);
	}

	public static doTouchBegan(pointLine: eui.Image, linePanel: egret.Sprite, $grid: Grid, x: number, y: number): void {
		BattleLogic.deleteClearList();
		let grid: Grid = App.GridManager.getTouchGrid(x, y);
		if (grid) {
			grid.selectState = true;
			BattleLogic.pushClearGrid(grid, linePanel);
			Log.trace("row: " + grid.row + ", column: " + grid.column);
			//提示线
			let point = ObjectPool.pop(egret.Point, "egret.Point", grid.x, grid.y);// new egret.Point(grid.x, grid.y);
			BattleLogic.createPointLine(pointLine, linePanel, point);
			$grid = grid;
			ObjectPool.push(point);
		}
	}

	public static doTouchMove(pointLine: eui.Image, linePanel: egret.Sprite, $grid: Grid, x, y): void {
		BattleLogic.updatePointLineEnd(pointLine, linePanel, $grid, x, y);
		let grid: Grid = App.GridManager.getTouchGrid(x, y);
		if (grid) {
			if (grid.isSelected) {
				// 倒数第二个要回退
				let flag: boolean = App.GridManager.getIsLastTwoInClearList(grid);
				if (flag) {
					App.GridManager.removeTopLine();
					let topItem: Grid = App.GridManager.removeTopItemInCleanList();
					topItem.selectState = false;
					this.updatePointLineBegan(pointLine, linePanel, $grid, x, y);
				}
			} else {
				// 是否符合周围的
				let sameID = App.GridManager.getClearListId();
				let isArround = App.GridManager.isInArround(grid);
				// 类型相同,推入消除队列 && 在上个Grid的周围
				if (grid.id == sameID && isArround) {
					grid.selectState = true;
					BattleLogic.pushClearGrid(grid, linePanel);
					this.updatePointLineBegan(pointLine, linePanel, $grid, x, y);
				}
			}
		}
	}

	// 更新提示线的起点
	private static updatePointLineBegan(pointLine: eui.Image, linePanel: egret.Sprite, $grid: Grid, x, y) {
		let len = App.GridManager.clearList.length;
		if (len > 0) {
			let topGrid = App.GridManager.clearList[len - 1];
			$grid = topGrid;
			this.updatePointLineEnd(pointLine, linePanel, $grid, x, y);
		}
	}

	// 舞台坐标x, y更新提示线的结束点
	private static updatePointLineEnd(pointLine: eui.Image, linePanel: egret.Sprite, $grid: Grid, x, y) {
		if (pointLine && $grid) {
			let linePoint = ObjectPool.pop(egret.Point, "egret.Point", $grid.x, $grid.y);// new egret.Point($grid.x, $grid.y);
			// 坐标转换
			let p = linePanel.globalToLocal(x, y);
			let distance = egret.Point.distance(linePoint, p);
			pointLine.width = distance;
			pointLine.x = linePoint.x;
			pointLine.y = linePoint.y;
			pointLine.anchorOffsetX = 0;
			pointLine.anchorOffsetY = pointLine.height / 2;
			let angle = App.MathUtils.getLineAngle(linePoint, p);
			pointLine.rotation = angle;
			ObjectPool.push(linePoint);
		}
	}

	private static drawLine(linePanel: egret.Sprite, fromGrid: Grid, toGrid: Grid) {
		let lineTexture = RES.getRes("battleMission_line");
		let line = ObjectPool.pop(eui.Image, "eui.Image");
		line.texture = lineTexture;
		line.anchorOffsetX = 0;
		line.anchorOffsetY = lineTexture.textureHeight / 2;
		linePanel.addChild(line);
		App.GridManager.lineArray.push(line);
		line.x = fromGrid.x;
		line.y = fromGrid.y;
		// 宽度
		let fromPoint: egret.Point = new egret.Point(fromGrid.x, fromGrid.y);
		let toPoint: egret.Point = new egret.Point(toGrid.x, toGrid.y);
		let distance = egret.Point.distance(fromPoint, toPoint);
		line.width = distance;
		// 旋转角度
		let angle = App.MathUtils.getLineAngle(fromPoint, toPoint);
		line.rotation = angle;
	}
}