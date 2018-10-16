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
/**
 * 大Loading
 */
var BigLoading = (function (_super) {
    __extends(BigLoading, _super);
    function BigLoading() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.createView, _this);
        return _this;
    }
    BigLoading.prototype.createView = function () {
        var self = this;
        self.width = self.stage.stageWidth;
        self.height = self.stage.stageHeight;
        //加载大背景
        this.Bg = new egret.Bitmap();
        this.Bg.texture = RES.getRes("loadingBg_jpg");
        this.Bg.width = this.width;
        this.Bg.height = this.height;
        this.addChild(this.Bg);
        this.Bg.cacheAsBitmap = true;
        //文本
        this.textField = new egret.TextField();
        this.addChild(this.textField);
        this.textField.width = 480;
        this.textField.height = 20;
        this.textField.y = this.height / 2 - this.textField.height / 2;
        this.textField.size = 20;
        this.textField.textAlign = "center";
    };
    BigLoading.prototype.onProgress = function (current, total) {
        if (this.textField) {
            this.textField.text = "Loading..." + current + "/" + total;
        }
    };
    return BigLoading;
}(egret.Sprite));
__reflect(BigLoading.prototype, "BigLoading", ["RES.PromiseTaskReporter"]);
//# sourceMappingURL=BigLoading.js.map