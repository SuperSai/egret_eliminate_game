var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var MapVO = (function () {
    function MapVO() {
    }
    Object.defineProperty(MapVO.prototype, "path", {
        /** 地图行走路径 */
        get: function () {
            return this._path;
        },
        set: function (value) {
            this._path = ObjectUtils.splitToString(value, "#");
        },
        enumerable: true,
        configurable: true
    });
    return MapVO;
}());
__reflect(MapVO.prototype, "MapVO");
