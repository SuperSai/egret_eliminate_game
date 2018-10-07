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
    return BattleConst;
}());
__reflect(BattleConst.prototype, "BattleConst");
//# sourceMappingURL=BattleConst.js.map