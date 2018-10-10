class BattleLogic {

	public static cleanIndex = 0;

	public static pushClearGrid($grid: Grid, linePanel: egret.Sprite) {
		App.GridManager.clearList.push($grid);
		var length = App.GridManager.clearList.length;
		if (length > 1) {
			var fromGrid = App.GridManager.clearList[length - 2];
			BattleLogic.drawLine(linePanel, fromGrid, $grid);
			// 提示线更新起点
		}
	}

	public static createGrid(gridPanel: egret.Sprite, row: number, column: number, id: number): Grid {
		var grid = ObjectPool.pop(Grid, "Grid", id);// new Grid(id);
		grid.row = row;
		grid.column = column;
		App.GridManager.gridArray[row][column] = grid;
		gridPanel.addChild(grid);
		return grid;
	}

	public static createPointLine(pointLine: eui.Image, linePanel: egret.Sprite, pos: egret.Point) {
		if (pointLine) {
			if (pointLine.parent) {
				pointLine.parent.removeChild(pointLine);
			}
		}
		pointLine = new eui.Image();
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
		for (var i = App.GridManager.row - 1; i >= 0; i--) {
			for (var j = 0; j < App.GridManager.column; j++) {
				var item: Grid = App.GridManager.gridArray[i][j];
				if (item != null) {
					var ret = App.GridManager.getDropRowAndColumn(item);
					var row = ret.row;
					var column = ret.column;
					if (item.row != row || item.column != column) {
						item.drop(ret.row, ret.column);
					}
				}
			}
		}
		// 填充
		var emptyPosArr = App.GridManager.getEmptyGrid();
		for (var k in emptyPosArr) {
			var emptyRow = emptyPosArr[k].row;
			var emptyColumn = emptyPosArr[k].column;
			var id = App.GridManager.genDropGridId(emptyRow, emptyColumn);
			var grid: Grid = BattleLogic.createGrid(gridPanel, emptyRow, emptyColumn, id);
			grid.x = App.GridManager.getGridPosX(emptyColumn);
			grid.y = -Grid.Height / 2;
			grid.drop(emptyRow, emptyColumn);
		}
	}

	public static createDirty(gridPanel: egret.Sprite, $grid: Grid) {
		// 痕迹
		var dirty = new eui.Image("battle_icon_" + $grid.id);
		let texture = RES.getRes("battle_icon_" + $grid.id);
		dirty.anchorOffsetX = texture.textureWidth / 2;
		dirty.anchorOffsetY = texture.textureHeight / 2;
		dirty.x = $grid.x;
		dirty.y = $grid.y;
		dirty.scaleX = dirty.scaleY = 0;
		var rotation = Math.random() * 360;
		dirty.rotation = rotation;
		gridPanel.addChild(dirty);

		var tw = egret.Tween.get(dirty);
		tw.to({ scaleX: 1.2, scaleY: 1.2 }, 400, egret.Ease.bounceOut)
			.wait(200)
			.to({ alpha: 0 }, 100)
			.call(function (node) {
				if (node && node.parent) {
					node.parent.removeChild(node);
				}
			}, this, [dirty]);
	}

	public static doTouchBegan(pointLine: eui.Image, linePanel: egret.Sprite, $grid: Grid, x: number, y: number): void {
		BattleLogic.deleteClearList();
		var grid: Grid = App.GridManager.getTouchGrid(x, y);
		if (grid) {
			grid.selectState = true;
			BattleLogic.pushClearGrid(grid, linePanel);
			Log.trace("row: " + grid.row + ", column: " + grid.column);
			//提示线
			var point = new egret.Point(grid.x, grid.y);
			BattleLogic.createPointLine(pointLine, linePanel, point);
			$grid = grid;
		}
	}

	public static doTouchMove(pointLine: eui.Image, linePanel: egret.Sprite, $grid: Grid, x, y): void {
		BattleLogic.updatePointLineEnd(pointLine, linePanel, $grid, x, y);
		var grid: Grid = App.GridManager.getTouchGrid(x, y);
		if (grid) {
			if (grid.isSelected) {
				// 倒数第二个要回退
				var b = App.GridManager.getIsLastTwoInClearList(grid);
				if (b) {
					App.GridManager.removeTopLine();
					var topItem: Grid = App.GridManager.removeTopItemInCleanList();
					topItem.selectState = false;
					this.updatePointLineBegan(pointLine, linePanel, $grid, x, y);
				}
			} else {
				// 是否符合周围的
				var sameID = App.GridManager.getClearListId();
				var isArround = App.GridManager.isInArround(grid);
				if (grid.id == sameID &&  // 类型相同,推入消除队列
					isArround) {// 在上个cell的周围
					grid.selectState = true;
					BattleLogic.pushClearGrid(grid, linePanel);
					this.updatePointLineBegan(pointLine, linePanel, $grid, x, y);
				}
			}
		}
	}


	// 舞台坐标x, y 更新提示线的结束点
	private static updatePointLineEnd(pointLine: eui.Image, linePanel: egret.Sprite, $grid: Grid, x, y) {
		if (pointLine && $grid) {
			var linePoint = new egret.Point($grid.x, $grid.y);
			// 坐标转换
			var p = linePanel.globalToLocal(x, y);
			var distance = egret.Point.distance(linePoint, p);
			pointLine.width = distance;
			pointLine.x = linePoint.x;
			pointLine.y = linePoint.y;
			pointLine.anchorOffsetX = 0;
			pointLine.anchorOffsetY = pointLine.height / 2;
			var angle = App.MathUtils.getLineAngle(linePoint, p);
			pointLine.rotation = angle;

		}
	}

	// 更新提示线的起点
	private static updatePointLineBegan(pointLine: eui.Image, linePanel: egret.Sprite, $grid: Grid, x, y) {
		var len = App.GridManager.clearList.length;
		if (len > 0) {
			var topGrid = App.GridManager.clearList[len - 1];
			$grid = topGrid;
			this.updatePointLineEnd(pointLine, linePanel, $grid, x, y);
		}
	}

	private static drawLine(linePanel: egret.Sprite, fromGrid: Grid, toGrid: Grid) {
		var lineTexture = RES.getRes("battleMission_line");
		var line = new eui.Image();
		line.texture = lineTexture;
		line.anchorOffsetX = 0;
		line.anchorOffsetY = lineTexture.textureHeight / 2;
		linePanel.addChild(line);
		App.GridManager.lineArray.push(line);
		line.x = fromGrid.x;
		line.y = fromGrid.y;

		// 宽度
		var fromPoint: egret.Point = new egret.Point(fromGrid.x, fromGrid.y);
		var toPoint: egret.Point = new egret.Point(toGrid.x, toGrid.y);
		var distance = egret.Point.distance(fromPoint, toPoint);
		line.width = distance;
		// 旋转角度
		var angle = App.MathUtils.getLineAngle(fromPoint, toPoint);
		line.rotation = angle;
	}
}