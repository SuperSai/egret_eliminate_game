var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var BattleLogic = (function () {
    function BattleLogic() {
    }
    BattleLogic.pushClearGrid = function ($grid, linePanel) {
        App.GridManager.clearList.push($grid);
        var length = App.GridManager.clearList.length;
        if (length > 1) {
            var fromGrid = App.GridManager.clearList[length - 2];
            BattleLogic.drawLine(linePanel, fromGrid, $grid);
            // 提示线更新起点
        }
    };
    /** 创建格子 */
    BattleLogic.createGrid = function (gridPanel, row, column, id) {
        var grid = ObjectPool.pop(Grid, "Grid", id);
        grid.row = row;
        grid.column = column;
        App.GridManager.gridArray[row][column] = grid;
        gridPanel.addChild(grid);
        return grid;
    };
    /** 创建格子和格子之间的线 */
    BattleLogic.createPointLine = function (pointLine, linePanel, pos) {
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
    };
    BattleLogic.deleteClearList = function () {
        App.GridManager.clearList = [];
        App.GridManager.lineArray = [];
        this.cleanIndex = 0;
    };
    BattleLogic.dropAndFillGrid = function (gridPanel) {
        // 下落
        for (var i = App.GridManager.row - 1; i >= 0; i--) {
            for (var j = 0; j < App.GridManager.column; j++) {
                var item = App.GridManager.gridArray[i][j];
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
            var grid = BattleLogic.createGrid(gridPanel, emptyRow, emptyColumn, id);
            grid.x = App.GridManager.getGridPosX(emptyColumn);
            grid.y = -Grid.Height / 2;
            grid.drop(emptyRow, emptyColumn);
        }
    };
    BattleLogic.createDirty = function (gridPanel, $grid) {
        // 痕迹
        var dirty = new eui.Image("battle_icon_" + $grid.id);
        var texture = RES.getRes("battle_icon_" + $grid.id);
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
    };
    BattleLogic.doTouchBegan = function (pointLine, linePanel, $grid, x, y) {
        BattleLogic.deleteClearList();
        var grid = App.GridManager.getTouchGrid(x, y);
        if (grid) {
            grid.selectState = true;
            BattleLogic.pushClearGrid(grid, linePanel);
            Log.trace("row: " + grid.row + ", column: " + grid.column);
            //提示线
            var point = new egret.Point(grid.x, grid.y);
            BattleLogic.createPointLine(pointLine, linePanel, point);
            $grid = grid;
        }
    };
    BattleLogic.doTouchMove = function (pointLine, linePanel, $grid, x, y) {
        BattleLogic.updatePointLineEnd(pointLine, linePanel, $grid, x, y);
        var grid = App.GridManager.getTouchGrid(x, y);
        if (grid) {
            if (grid.isSelected) {
                // 倒数第二个要回退
                var flag = App.GridManager.getIsLastTwoInClearList(grid);
                if (flag) {
                    App.GridManager.removeTopLine();
                    var topItem = App.GridManager.removeTopItemInCleanList();
                    topItem.selectState = false;
                    this.updatePointLineBegan(pointLine, linePanel, $grid, x, y);
                }
            }
            else {
                // 是否符合周围的
                var sameID = App.GridManager.getClearListId();
                var isArround = App.GridManager.isInArround(grid);
                // 类型相同,推入消除队列 && 在上个Grid的周围
                if (grid.id == sameID && isArround) {
                    grid.selectState = true;
                    BattleLogic.pushClearGrid(grid, linePanel);
                    this.updatePointLineBegan(pointLine, linePanel, $grid, x, y);
                }
            }
        }
    };
    // 更新提示线的起点
    BattleLogic.updatePointLineBegan = function (pointLine, linePanel, $grid, x, y) {
        var len = App.GridManager.clearList.length;
        if (len > 0) {
            var topGrid = App.GridManager.clearList[len - 1];
            $grid = topGrid;
            this.updatePointLineEnd(pointLine, linePanel, $grid, x, y);
        }
    };
    // 舞台坐标x, y更新提示线的结束点
    BattleLogic.updatePointLineEnd = function (pointLine, linePanel, $grid, x, y) {
        if (pointLine && $grid) {
            var linePoint = ObjectPool.pop(egret.Point, "egret.Point", $grid.x, $grid.y); // new egret.Point($grid.x, $grid.y);
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
            ObjectPool.push(linePoint);
        }
    };
    BattleLogic.drawLine = function (linePanel, fromGrid, toGrid) {
        var lineTexture = RES.getRes("battleMission_line");
        var line = ObjectPool.pop(eui.Image, "eui.Image");
        line.texture = lineTexture;
        line.anchorOffsetX = 0;
        line.anchorOffsetY = lineTexture.textureHeight / 2;
        linePanel.addChild(line);
        App.GridManager.lineArray.push(line);
        line.x = fromGrid.x;
        line.y = fromGrid.y;
        // 宽度
        var fromPoint = new egret.Point(fromGrid.x, fromGrid.y);
        var toPoint = new egret.Point(toGrid.x, toGrid.y);
        var distance = egret.Point.distance(fromPoint, toPoint);
        line.width = distance;
        // 旋转角度
        var angle = App.MathUtils.getLineAngle(fromPoint, toPoint);
        line.rotation = angle;
    };
    BattleLogic.cleanIndex = 0;
    return BattleLogic;
}());
__reflect(BattleLogic.prototype, "BattleLogic");
//# sourceMappingURL=BattleLogic.js.map