class GridManager extends BaseClass {

	public gridArray: any[] = [];// 所有grid数组
	public clearList: any[] = [];// 清理grid的队列
	public lineArray: any[] = [];// 临时存放line的数组

	public row = 6;
	public rowSpace = 20;
	public column = 6;
	public columnSpace = 20;
	public baseCleanNum = 3;

	public constructor() {
		super();
	}

	public cleanGridArray() {
		let self = this;
		self.gridArray = [];
		for (let i = 0; i < self.row; i++) {
			self.gridArray.push([]);
			for (let j = 0; j < self.column; j++) {
				self.gridArray[i].push(null);
			}
		}
	}

	public genDropGridId(row: number, column: number) {
		// 思路是:假设该位置有id, 从该位置出发可以得到相同id的数量
		// 棋盘现阶段拥有可以消除id的数量
		// 利用这个控制难度
		let idArr = [1, 2, 3, 4, 5];
		let n = Math.random() * idArr.length;
		let i = Math.floor(n);
		return idArr[i];
	}

	public genInitGridId(row: number, column: number) {
		let json = RES.getRes("gameCellCfg_json");
		let arr = json["1"];
		let id = arr[row][column];
		return id;
	}

	public removeAllGridAction() {
		let self = this;
		for (let k in self.gridArray) {
			for (let j in self.gridArray[k]) {
				let item: Grid = self.gridArray[k][j];
				if (item) {
					egret.Tween.removeTweens(item);
					item.scaleX = item.scaleY = 1;
				}
			}
		}
	}

	public setAllGridCheckMark(value: boolean) {
		let self = this;
		for (let k in self.gridArray) {
			for (let j in self.gridArray[k]) {
				let item: Grid = self.gridArray[k][j];
				if (item) {
					item.checkMark = value;
				}
			}
		}
	}

	// 获取现在棋盘的可以清除的队列数目
	public getNowCleanListNum() {
		let self = this;
		let arr = [];
		for (let k in self.gridArray) {
			for (let j in self.gridArray[k]) {
				let item: Grid = self.gridArray[k][j];
				if (item && item.checkMark == false) {
					let sameArr = [item];
					self.getSameArrByGrid(item, sameArr);
					if (sameArr.length >= self.baseCleanNum) {
						arr.push(sameArr);
					}
				}
			}
		}
		self.setAllGridCheckMark(false);
		return arr;
	}

	public getSameArrByGrid(grid: Grid, sameArray: any[]) {
		let self = this;
		let row: number = grid.row;
		let column: number = grid.column;
		let id = grid.id;
		grid.checkMark = true;
		// 判断左边Grid
		let leftRow: number = row;
		let leftColumn: number = column - 1;
		if (leftColumn >= 0) {
			let leftCell = self.gridArray[leftRow][leftColumn];
			if (leftCell.id == id && leftCell.checkFlag == false) {
				leftCell.checkFlag = true;
				self.getSameArrByGrid(leftCell, sameArray);
				sameArray.push(leftCell);
			}
		}
		// 判断右边Grid
		let rightRow: number = row;
		let rightColumn: number = column + 1;
		if (rightColumn < self.column) {
			let rightCell = self.gridArray[rightRow][rightColumn];
			if (rightCell.id == id && rightCell.checkFlag == false) {
				rightCell.checkFlag = true;
				self.getSameArrByGrid(rightCell, sameArray);
				sameArray.push(rightCell);
			}
		}
		// 判断下边Grid
		let bottomRow: number = row + 1;
		let bottomColumn: number = column;
		if (bottomRow < self.row) {
			let bottomCell = self.gridArray[bottomRow][bottomColumn];
			if (bottomCell.id == id && bottomCell.checkFlag == false) {
				bottomCell.checkFlag = true;
				self.getSameArrByGrid(bottomCell, sameArray);
				sameArray.push(bottomCell);
			}
		}
		// 判断上边Grid
		let topRow: number = row - 1;
		let topColumn: number = column;
		if (topRow >= 0) {
			let topCell = self.gridArray[topRow][topColumn];
			if (topCell.id == id && topCell.checkFlag == false) {
				topCell.checkFlag = true;
				self.getSameArrByGrid(topCell, sameArray);
				sameArray.push(topCell);
			}
		}
	}

	public setGrid(grid: Grid, row: number, column: number) {
		let self = this;
		// 设置老地方为空
		let cellRow: number = grid.row;
		let cellColumn: number = grid.column;
		self.gridArray[cellRow][cellColumn] = null;

		// 设置新地方
		grid.row = row;
		grid.column = column;
		self.gridArray[row][column] = grid;
	}

	public clearGrid(grid: Grid) {
		let self = this;
		let row: number = grid.row;
		let column: number = grid.column;
		self.gridArray[row][column] = null;
	}

	/** 获取格子的X位置 */
	public getGridPosX(cloumn: number) {
		let self = this;
		let harfWidth: number = Grid.Width / 2;
		let x = cloumn * (Grid.Width + self.columnSpace) + harfWidth;
		return x;
	}

	/** 获取格子的Y位置 */
	public getGridPosY(row: number) {
		let self = this;
		let harfHeight: number = Grid.Height / 2;
		let y = row * (Grid.Height + self.rowSpace) + harfHeight;
		return y;
	}

	public getTouchGrid(x: number, y: number) {
		let self = this;
		for (let k in self.gridArray) {
			let itemLineArr = self.gridArray[k];
			for (let j in itemLineArr) {
				let item = itemLineArr[j];
				if (item) {
					let flag = item.hitTestPoint(x, y);
					if (flag) {
						return item;
					}
				}
			}
		}
		return null;
	}

	public getClearListId() {
		let self = this;
		if (self.clearList.length > 0) {
			let grid: Grid = self.clearList[0];
			return grid.id;
		}
		return 0;
	}

	public isInArround(grid: Grid) {
		let self = this;
		let row: number = grid.row;
		let column: number = grid.column;
		let len: number = self.clearList.length;
		if (len > 0) {
			let item: Grid = self.clearList[len - 1];
			let itemRow = item.row;
			let itemColumn = item.column;
			if (itemRow == row + 1 || itemRow == row - 1 || itemRow == row) {
				if (itemColumn == column + 1 || itemColumn == column - 1 || itemColumn == column) {
					return true;
				}
			}
		}
		return false;
	}

	// 这个grid是否是倒数第二个
	public getIsLastTwoInClearList(grid: Grid) {
		let self = this;
		let length: number = self.clearList.length;
		if (length >= 2) {
			let index = length - 2;
			let item: Grid = self.clearList[index];
			if (item == grid) {
				return true;
			}
		}
		return false;
	}

	public removeTopItemInCleanList() {
		let self = this;
		let length: number = self.clearList.length;
		if (length > 0) {
			let topItem = self.clearList[length - 1];
			ObjectUtils.removeFromArray(topItem, self.clearList);
			return topItem;
		}
	}

	// 移除最后的一条线
	public removeTopLine() {
		let self = this;
		let length: number = self.lineArray.length;
		if (length > 0) {
			let lineItem = self.lineArray[length - 1];
			ObjectUtils.removeFromArray(lineItem, self.lineArray);
			if (lineItem.parent) {
				App.DisplayUtils.removeFromParent(lineItem);
			}
		}
	}

	// 是否有Grid在move
	public isAllMove() {
		let self = this;
		for (let k in self.gridArray) {
			let itemArr = self.gridArray[k];
			for (let j in itemArr) {
				let item: Grid = itemArr[j];
				if (item && item.moveFlag == true) {
					return true;
				}
			}
		}
		return false;
	}

	// 获取空的cell
	public getEmptyGrid() {
		let self = this;
		let retArr: any[] = [];
		for (let i = self.row - 1; i >= 0; i--) {
			for (let j = 0; j < self.column; j++) {
				let item: Grid = self.gridArray[i][j];
				if (item == null) {
					let p = { row: i, column: j };
					retArr.push(p);
				}
			}
		}
		return retArr;
	}

	public getDropRowAndColumn(grid: Grid) {
		let self = this;
		let row: number = grid.row;
		let column: number = grid.column;
		let ret: any = { row: row, column: column };
		row++;
		while (row < self.row) {
			let item = self.gridArray[row][column];
			if (item == null) {
				ret.row++;
				row++;
			} else {
				break;
			}
		}
		return ret;
	}
}