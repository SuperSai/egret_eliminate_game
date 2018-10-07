var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Created by zmliu on 14-5-11.
 */
var starlingswf;
(function (starlingswf) {
    /**
     * Swf文档类
     * */
    var Swf = (function () {
        function Swf(swfData, assetManager, fps) {
            if (fps === void 0) { fps = 24; }
            this._swfData = swfData;
            this._assetManager = assetManager;
            this._createDisplayFuns = new Object();
            this._createDisplayFuns[Swf.dataKey_Sprite] = this.createSprite;
            this._createDisplayFuns[Swf.dataKey_MovieClip] = this.createMovie;
            this._createDisplayFuns[Swf.dataKey_Image] = this.createImage;
            this._createDisplayFuns[Swf.dataKey_Scale9] = this.createS9Image;
            this._createDisplayFuns[Swf.dataKey_ShapeImg] = this.createShapeImage;
            this._createDisplayFuns[Swf.dataKey_TextField] = this.createTextField;
            this.swfUpdateManager = starlingswf.SwfUpdateManager.createSwfUpdateManager(fps);
        }
        Swf.prototype.createSprite = function (name, data, sprData) {
            if (data === void 0) { data = null; }
            if (sprData === void 0) { sprData = null; }
            if (sprData == null) {
                sprData = this._swfData[Swf.dataKey_Sprite][name];
            }
            var sprite = new starlingswf.SwfSprite();
            var length = sprData.length;
            var objData;
            var display;
            var fun;
            var swf;
            for (var i = 0; i < length; i++) {
                objData = sprData[i];
                fun = this._createDisplayFuns[objData[1]];
                if (fun == null)
                    continue;
                display = fun.apply(this, [objData[0], objData]);
                display.name = objData[9];
                display.x = objData[2];
                display.y = objData[3];
                if (objData[0] == Swf.dataKey_TextField) {
                    //                    display.y += objData[14] / 10;
                }
                if (objData[1] != Swf.dataKey_Scale9 && objData[1] != Swf.dataKey_ShapeImg) {
                    display.scaleX = objData[4];
                    display.scaleY = objData[5];
                }
                display.skewX = objData[6];
                display.skewY = objData[7];
                display.alpha = objData[8];
                sprite.addChild(display);
            }
            return sprite;
        };
        Swf.prototype.createMovie = function (name, data, cls) {
            if (data === void 0) { data = null; }
            if (cls === void 0) { cls = null; }
            var movieClipData = this._swfData[Swf.dataKey_MovieClip][name];
            var objectCountData = movieClipData["objCount"];
            var displayObjects = {};
            var displayObjectArray;
            var type;
            var count;
            var fun;
            var objName;
            for (objName in objectCountData) {
                type = objectCountData[objName][0];
                count = objectCountData[objName][1];
                displayObjectArray = displayObjects[objName] == null ? [] : displayObjects[objName];
                for (var i = 0; i < count; i++) {
                    fun = this._createDisplayFuns[type];
                    if (fun == null)
                        continue;
                    displayObjectArray.push(fun.apply(this, [objName, null]));
                }
                displayObjects[objName] = displayObjectArray;
            }
            var mc;
            if (cls == null) {
                mc = new starlingswf.SwfMovieClip(movieClipData["frames"], movieClipData["labels"], displayObjects, this);
            }
            else {
                mc = new cls(movieClipData["frames"], movieClipData["labels"], displayObjects, this);
            }
            mc.loop = movieClipData["loop"];
            return mc;
        };
        Swf.prototype.createImage = function (name, data) {
            if (data === void 0) { data = null; }
            var imageData = this._swfData[Swf.dataKey_Image][name];
            var bitmap = this._assetManager.createBitmap(name);
            bitmap.anchorOffsetX = imageData[0];
            bitmap.anchorOffsetY = imageData[1];
            return bitmap;
        };
        Swf.prototype.getTexture = function (name) {
            return this._assetManager.getTexture(name);
        };
        Swf.prototype.createS9Image = function (name, data) {
            if (data === void 0) { data = null; }
            var scale9Data = this._swfData[Swf.dataKey_Scale9][name];
            var bitmap = this._assetManager.createBitmap(name);
            bitmap.scale9Grid = new egret.Rectangle(scale9Data[0], scale9Data[1], scale9Data[2], scale9Data[3]);
            if (data != null) {
                bitmap.width = data[10];
                bitmap.height = data[11];
            }
            return bitmap;
        };
        Swf.prototype.createShapeImage = function (name, data) {
            if (data === void 0) { data = null; }
            var bitmap = this._assetManager.createBitmap(name);
            bitmap.fillMode = egret.BitmapFillMode.REPEAT;
            if (data != null) {
                bitmap.width = data[10];
                bitmap.height = data[11];
            }
            return bitmap;
        };
        Swf.prototype.createTextField = function (name, data) {
            if (data === void 0) { data = null; }
            var textfield = new egret.TextField();
            if (data != null) {
                textfield.width = data[10];
                textfield.height = data[11];
                //textfield.fontFamily = <string>data[12];
                textfield.textColor = data[13];
                textfield.size = data[14];
                textfield.textAlign = data[15];
                //textfield.italic = data[16];
                //textfield.bold = data[17];
                textfield.text = data[18];
            }
            return textfield;
        };
        /**
         * 是否有某个Sprite
         * */
        Swf.prototype.hasSprite = function (name) {
            return this._swfData[Swf.dataKey_Sprite][name] != null;
        };
        /**
         * 是否有某个MovieClip
         * */
        Swf.prototype.hasMovieClip = function (name) {
            return this._swfData[Swf.dataKey_MovieClip][name] != null;
        };
        /**
         * 是否有某个Image
         * */
        Swf.prototype.hasImage = function (name) {
            return this._swfData[Swf.dataKey_Image][name] != null;
        };
        /**
         * 是否有某个S9Image
         * */
        Swf.prototype.hasS9Image = function (name) {
            return this._swfData[Swf.dataKey_Scale9][name] != null;
        };
        /**
         * 是否有某个S9Image
         * */
        Swf.prototype.hasShapeImage = function (name) {
            return this._swfData[Swf.dataKey_ShapeImg][name] != null;
        };
        Swf.dataKey_Sprite = "spr";
        Swf.dataKey_Image = "img";
        Swf.dataKey_MovieClip = "mc";
        Swf.dataKey_TextField = "text";
        Swf.dataKey_Button = "btn";
        Swf.dataKey_Scale9 = "s9";
        Swf.dataKey_ShapeImg = "shapeImg";
        Swf.dataKey_Component = "comp";
        Swf.dataKey_Particle = "particle";
        return Swf;
    }());
    starlingswf.Swf = Swf;
    __reflect(Swf.prototype, "starlingswf.Swf");
})(starlingswf || (starlingswf = {}));
//# sourceMappingURL=Swf.js.map