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
var BaseEuiAlert = (function (_super) {
    __extends(BaseEuiAlert, _super);
    function BaseEuiAlert($controller, $layer, $skinName, $viewShowType) {
        if ($viewShowType === void 0) { $viewShowType = VIEW_SHOW_TYPE.UP; }
        var _this = _super.call(this, $controller, $layer) || this;
        _this.isMaskTouch = true;
        _this.skinName = $skinName;
        _this._layer = $layer;
        _this._viewShowType = $viewShowType;
        return _this;
    }
    /** 对面板进行显示初始化，用于子类继承 */
    BaseEuiAlert.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        var self = this;
        if (!self._maskRect) {
            self._maskRect = self.getMask(0);
            self.addChild(self._maskRect);
        }
        App.LayerManager.addToLayer(self._maskRect, this._layer);
        self.myParent.setChildIndex(self._maskRect, 0);
    };
    BaseEuiAlert.prototype.initData = function () {
        _super.prototype.initData.call(this);
        var self = this;
        App.EffectUtils.viewShowEffect(self, self._viewShowType, self.effectCallBack);
    };
    BaseEuiAlert.prototype.addEvents = function () {
        _super.prototype.addEvents.call(this);
        var self = this;
        self.isMaskTouch && self._maskRect && self._maskRect.addEventListener(egret.TouchEvent.TOUCH_TAP, self.onMaskHandler, self);
        self.btn_close && self.btn_close.addEventListener(egret.TouchEvent.TOUCH_TAP, self.onClosePanel, self);
    };
    BaseEuiAlert.prototype.removeEvents = function () {
        _super.prototype.removeEvents.call(this);
        var self = this;
        self.btn_close && self.btn_close.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.onClosePanel, self);
        self.isMaskTouch && self._maskRect && self._maskRect.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.onMaskHandler, self);
    };
    BaseEuiAlert.prototype.onMaskHandler = function () {
        var self = this;
        App.DisplayUtils.removeFromParent(self._maskRect);
        self._maskRect = null;
        App.ViewManager.closeView(self);
    };
    BaseEuiAlert.prototype.onClosePanel = function () {
        var self = this;
        App.DisplayUtils.removeFromParent(self._maskRect);
        self._maskRect = null;
        App.ViewManager.closeView(self);
    };
    BaseEuiAlert.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        _super.prototype.close.call(this, param);
        var self = this;
        App.DisplayUtils.removeFromParent(self._maskRect);
        self._maskRect = null;
    };
    /** 创建遮罩 */
    BaseEuiAlert.prototype.getMask = function (maskAlpha) {
        var rect = new eui.Rect();
        rect.touchEnabled = true;
        rect.percentWidth = 100;
        rect.percentHeight = 100;
        rect.fillColor = 0x0;
        rect.fillAlpha = maskAlpha;
        return rect;
    };
    Object.defineProperty(BaseEuiAlert.prototype, "maskRect", {
        get: function () {
            return this._maskRect;
        },
        set: function (value) {
            this._maskRect = value;
        },
        enumerable: true,
        configurable: true
    });
    return BaseEuiAlert;
}(BaseEuiView));
__reflect(BaseEuiAlert.prototype, "BaseEuiAlert");
//# sourceMappingURL=BaseEuiAlert.js.map