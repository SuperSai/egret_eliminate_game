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
var MessageManger = (function (_super) {
    __extends(MessageManger, _super);
    function MessageManger() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._textDisplayDic = new TSDictionary();
        _this._maxNum = 5;
        return _this;
    }
    MessageManger.prototype._creatOneTextDisplay = function () {
        var label = ObjectPool.pop(eui.Label, "eui.Label");
        label.textColor = 0xFFFFFF;
        label.stroke = 3;
        label.strokeColor = 0x401303;
        label.size = 40;
        label.fontFamily = "黑体";
        label.horizontalCenter = 0;
        label.verticalCenter = 0;
        label.touchEnabled = false;
        label.width = App.StageUtils.getWidth();
        label.wordWrap = true;
        label.textAlign = "center";
        label.y = App.StageUtils.getHeight() / 2;
        return label;
    };
    MessageManger.prototype.showText = function (message) {
        var display = this.getOne(message);
        display.text = message;
        var messageObject = { display: display, isplaying: true };
        this._textDisplayDic.Add(message, messageObject);
        this.startAnimation(message, display);
    };
    MessageManger.prototype.startAnimation = function (message, label) {
        var _this = this;
        App.LayerManager.addToLayer(label, LayerManager.GAME_POP_LAYER);
        label.alpha = 1;
        egret.Tween.get(label).wait(1000).to({ alpha: 0 }, 1000);
        egret.Tween.get(label).to({ verticalCenter: -100 }, 2000).call(function () {
            egret.Tween.removeTweens(label);
            label.alpha = 1;
            label.verticalCenter = 0;
            App.DisplayUtils.removeFromParent(label);
            _this.onAnimationComplete(message);
        });
    };
    MessageManger.prototype.onAnimationComplete = function (message) {
        var item = this._textDisplayDic.TryGetValue(message);
        if (item) {
            item.isplaying = false;
            this._textDisplayDic.Remove(message);
        }
    };
    MessageManger.prototype.removeTips = function () {
        var self = this;
        for (var i = 0; i < self._textDisplayDic.GetLenght(); i++) {
            var data = self._textDisplayDic.getValueByIndex(i);
            data.display.parent && data.display.parent.removeChild(data.display);
            data.display.alpha = 1;
            data.display.verticalCenter = 0;
            delete data.display.$children;
        }
        self._textDisplayDic.clear();
    };
    MessageManger.prototype.getOne = function (msg) {
        return this._creatOneTextDisplay();
    };
    return MessageManger;
}(BaseClass));
__reflect(MessageManger.prototype, "MessageManger");
//# sourceMappingURL=MessageManger.js.map