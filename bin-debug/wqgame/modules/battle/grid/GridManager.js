var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var GridManager = (function (_super) {
    __extends(GridManager, _super);
    function GridManager() {
        var _this = _super.call(this) || this;
        _this.gridArray = []; // 所有grid数组
        _this.clearList = []; // 清理grid的队列
        _this.lineArray = []; // 临时存放line的数组
        _this.row = 6;
        _this.rowSpace = 20;
        _this.column = 6;
        _this.columnSpace = 20;
        _this.baseCleanNum = 3;
        return _this;
    }
    GridManager.prototype.cleanGridArray = function () {
        var self = this;
        self.gridArray = [];
        for (var i = 0; i < self.row; i++) {
            self.gridArray.push([]);
            for (var j = 0; j < self.column; j++) {
                self.gridArray[i].push(null);
            }
        }
    };
    GridManager.prototype.genDropGridId = function (row, column) {
        // 利用这个控制难度
        return Math.floor(App.MathUtils.Range(0, 6));
    };
    GridManager.prototype.genInitGridId = function (row, column) {
        var json = RES.getRes("gameGrids");
        var arr = json["1"];
        var id = arr[row][column];
        return id;
    };
    GridManager.prototype.removeAllGridAction = function () {
        var self = this;
        for (var k in self.gridArray) {
            for (var j in self.gridArray[k]) {
                var item = self.gridArray[k][j];
                if (item) {
                    egret.Tween.removeTweens(item);
                    item.scaleX = item.scaleY = 1;
                }
            }
        }
    };
    GridManager.prototype.setAllGridCheckMark = function (value) {
        var self = this;
        for (var k in self.gridArray) {
            for (var j in self.gridArray[k]) {
                var item = self.gridArray[k][j];
                if (item) {
                    item.checkMark = value;
                }
            }
        }
    };
    // 获取现在棋盘的可以清除的队列数目
    GridManager.prototype.getNowCleanListNum = function () {
        var self = this;
        var arr = [];
        for (var k in self.gridArray) {
            for (var j in self.gridArray[k]) {
                var item = self.gridArray[k][j];
                if (item && item.checkMark == false) {
                    var sameArr = [item];
                    self.getSameArrByGrid(item, sameArr);
                    if (sameArr.length >= self.baseCleanNum) {
                        arr.push(sameArr);
                    }
                }
            }
        }
        self.setAllGridCheckMark(false);
        return arr;
    };
    GridManager.prototype.getSameArrByGrid = function (grid, sameArray) {
        var self = this;
        var row = grid.row;
        var column = grid.column;
        var id = grid.id;
        grid.checkMark = true;
        // 判断左边Grid
        var leftRow = row;
        var leftColumn = column - 1;
        if (leftColumn >= 0) {
            var leftCell = self.gridArray[leftRow][leftColumn];
            if (leftCell.id == id && leftCell.checkFlag == false) {
                leftCell.checkFlag = true;
                self.getSameArrByGrid(leftCell, sameArray);
                sameArray.push(leftCell);
            }
        }
        // 判断右边Grid
        var rightRow = row;
        var rightColumn = column + 1;
        if (rightColumn < self.column) {
            var rightCell = self.gridArray[rightRow][rightColumn];
            if (rightCell.id == id && rightCell.checkFlag == false) {
                rightCell.checkFlag = true;
                self.getSameArrByGrid(rightCell, sameArray);
                sameArray.push(rightCell);
            }
        }
        // 判断下边Grid
        var bottomRow = row + 1;
        var bottomColumn = column;
        if (bottomRow < self.row) {
            var bottomCell = self.gridArray[bottomRow][bottomColumn];
            if (bottomCell.id == id && bottomCell.checkFlag == false) {
                bottomCell.checkFlag = true;
                self.getSameArrByGrid(bottomCell, sameArray);
                sameArray.push(bottomCell);
            }
        }
        // 判断上边Grid
        var topRow = row - 1;
        var topColumn = column;
        if (topRow >= 0) {
            var topCell = self.gridArray[topRow][topColumn];
            if (topCell.id == id && topCell.checkFlag == false) {
                topCell.checkFlag = true;
                self.getSameArrByGrid(topCell, sameArray);
                sameArray.push(topCell);
            }
        }
    };
    GridManager.prototype.setGrid = function (grid, row, column) {
        var self = this;
        // 设置老地方为空
        var cellRow = grid.row;
        var cellColumn = grid.column;
        self.gridArray[cellRow][cellColumn] = null;
        // 设置新地方
        grid.row = row;
        grid.column = column;
        self.gridArray[row][column] = grid;
    };
    GridManager.prototype.clearGrid = function (grid) {
        var self = this;
        var row = grid.row;
        var column = grid.column;
        self.gridArray[row][column] = null;
    };
    /** 获取格子的X位置 */
    GridManager.prototype.getGridPosX = function (cloumn) {
        var self = this;
        var harfWidth = Grid.Width / 2;
        var x = cloumn * (Grid.Width + self.columnSpace) + harfWidth;
        return x;
    };
    /** 获取格子的Y位置 */
    GridManager.prototype.getGridPosY = function (row) {
        var self = this;
        var harfHeight = Grid.Height / 2;
        var y = row * (Grid.Height + self.rowSpace) + harfHeight;
        return y;
    };
    GridManager.prototype.getTouchGrid = function (x, y) {
        var self = this;
        for (var k in self.gridArray) {
            var itemLineArr = self.gridArray[k];
            for (var j in itemLineArr) {
                var item = itemLineArr[j];
                if (item) {
                    var flag = item.hitTestPoint(x, y);
                    if (flag) {
                        return item;
                    }
                }
            }
        }
        return null;
    };
    GridManager.prototype.getClearListId = function () {
        var self = this;
        if (self.clearList.length > 0) {
            var grid = self.clearList[0];
            return grid.id;
        }
        return 0;
    };
    /** 是否在范围内 */
    GridManager.prototype.isInArround = function (grid) {
        var self = this;
        var row = grid.row;
        var column = grid.column;
        var len = self.clearList.length;
        if (len > 0) {
            var item = self.clearList[len - 1];
            var itemRow = item.row;
            var itemColumn = item.column;
            if (itemRow == row + 1 || itemRow == row - 1 || itemRow == row) {
                if (itemColumn == column + 1 || itemColumn == column - 1 || itemColumn == column) {
                    return true;
                }
            }
        }
        return false;
    };
    // 这个grid是否是倒数第二个
    GridManager.prototype.getIsLastTwoInClearList = function (grid) {
        var self = this;
        var length = self.clearList.length;
        if (length >= 2) {
            var index = length - 2;
            var item = self.clearList[index];
            if (item == grid) {
                return true;
            }
        }
        return false;
    };
    GridManager.prototype.removeTopItemInCleanList = function () {
        var self = this;
        var length = self.clearList.length;
        if (length > 0) {
            var topItem = self.clearList[length - 1];
            ObjectUtils.removeFromArray(topItem, self.clearList);
            return topItem;
        }
    };
    // 移除最后的一条线
    GridManager.prototype.removeTopLine = function () {
        var self = this;
        var length = self.lineArray.length;
        if (length > 0) {
            var lineItem = self.lineArray[length - 1];
            ObjectUtils.removeFromArray(lineItem, self.lineArray);
            if (lineItem.parent) {
                App.DisplayUtils.removeFromParent(lineItem);
            }
        }
    };
    // 是否有Grid在move
    GridManager.prototype.isAllMove = function () {
        var self = this;
        for (var k in self.gridArray) {
            var itemArr = self.gridArray[k];
            for (var j in itemArr) {
                var item = itemArr[j];
                if (item && item.moveFlag == true) {
                    return true;
                }
            }
        }
        return false;
    };
    // 获取空的Grid
    GridManager.prototype.getEmptyGrid = function () {
        var self = this;
        var retArr = [];
        for (var i = self.row - 1; i >= 0; i--) {
            for (var j = 0; j < self.column; j++) {
                var id = App.GridManager.genInitGridId(i, j);
                if (id == -1)
                    continue;
                var item = self.gridArray[i][j];
                if (item == null) {
                    var p = { row: i, column: j };
                    retArr.push(p);
                }
            }
        }
        return retArr;
    };
    GridManager.prototype.getDropRowAndColumn = function (grid) {
        var self = this;
        var row = grid.row;
        var column = grid.column;
        var ret = { row: row, column: column };
        row++;
        while (row < self.row) {
            var id = App.GridManager.genInitGridId(row, column);
            if (id == -1)
                break;
            var item = self.gridArray[row][column];
            if (item == null) {
                ret.row++;
                row++;
            }
            else {
                break;
            }
        }
        return ret;
    };
    return GridManager;
}(BaseClass));
__reflect(GridManager.prototype, "GridManager");
