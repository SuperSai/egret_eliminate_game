var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var BattleConst = (function () {
    function BattleConst() {
    }
    /** 战斗初始化 */
    BattleConst.BATTLE_INIT = 11000;
    /** 选择战斗关卡 */
    BattleConst.BATTLE_SELECT_LEVEL = 11001;
    /** 进入战斗关卡 */
    BattleConst.BATTLE_ENTER_MISSION = 11002;
    /** 格子数据重置完毕 */
    BattleConst.GRID_RESET_COMPLETE = 11003;
    /** 格子掉落完毕 */
    BattleConst.GRID_DROP_COMPLETE = 11004;
    /** 地图Item更新 */
    BattleConst.MAP_ITEM_UPDATE = 11005;
    return BattleConst;
}());
__reflect(BattleConst.prototype, "BattleConst");
