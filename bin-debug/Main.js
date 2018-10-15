//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Main.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        var self = this;
        //注入自定义的素材解析器
        var assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());
        //初始化
        self.initLifecycle();
        self.initData();
        self.initPlatform();
    };
    Main.prototype.initLifecycle = function () {
        egret.lifecycle.addLifecycleListener(function (context) { });
        egret.lifecycle.onPause = function () { egret.ticker.pause(); };
        egret.lifecycle.onResume = function () { egret.ticker.resume(); };
    };
    /** 初始化数据 */
    Main.prototype.initData = function () {
        var self = this;
        //允许支持跨域加载图片
        egret.ImageLoader.crossOrigin = "anonymous";
        //适配方式(全屏适配)
        App.StageUtils.startFullscreenAdaptation(720, 1280, null);
        App.StageUtils.setFrameRate(60);
        App.StageUtils.setScaleMode(egret.StageScaleMode.FIXED_WIDTH);
        App.LayerManager.setup(App.StageUtils.getStage());
    };
    /** 初始化平台 */
    Main.prototype.initPlatform = function () {
        var self = this;
        switch (ext.getPlatform()) {
            case "wan83":
                break;
            case "facebook":
                break;
            case "wx":
                ext.getLogin(function (data, self) {
                    // PlayerInfoManager.getInstance.nickName = data.data.content;
                    ext.getUserInfo(self.userInfoBack, self);
                }, self);
                break;
            default:
                self.runGame();
                break;
        }
    };
    /** 开始运行游戏 */
    Main.prototype.runGame = function ($root) {
        if ($root === void 0) { $root = "resource/"; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        PathConfig.Root = $root;
                        return [4 /*yield*/, this.loadResource()];
                    case 1:
                        _a.sent();
                        this.createGameScene();
                        return [2 /*return*/];
                }
            });
        });
    };
    /** 加载资源 */
    Main.prototype.loadResource = function () {
        return __awaiter(this, void 0, void 0, function () {
            var loadingView, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        return [4 /*yield*/, this.loadGameComConfig()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, RES.loadGroup("loading")];
                    case 2:
                        _a.sent();
                        loadingView = new LoadingUI();
                        this.stage.addChild(loadingView);
                        return [4 /*yield*/, this.loadConfigs()];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.loadTheme()];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, this.loadCommonGroup(loadingView)];
                    case 5:
                        _a.sent();
                        this.stage.removeChild(loadingView);
                        return [3 /*break*/, 7];
                    case 6:
                        e_1 = _a.sent();
                        console.error(e_1);
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.loadGameComConfig = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            App.ResUtil.addConfig(PathConfig.GameComPath, PathConfig.Root);
            App.ResUtil.loadConfig(function () {
                resolve();
            }, _this);
        });
    };
    /** 加载配置文件 */
    Main.prototype.loadConfigs = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var configs = PathConfig.ConfigUrls;
            for (var i = 0; i < configs.length; i++) {
                App.ResUtil.addConfig(configs[i], PathConfig.Root);
            }
            App.ResUtil.loadConfig(function () {
                resolve();
            }, _this);
        });
    };
    /** 加载公共资源组 */
    Main.prototype.loadCommonGroup = function (loadingView) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            App.ResUtil.loadGroup(["common", "global"], function () {
                resolve();
            }, _this, 0, loadingView);
        });
    };
    /** 加载皮肤怕配置文件 */
    Main.prototype.loadTheme = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
            var theme = new eui.Theme(PathConfig.ThemePath, _this.stage);
            theme.addEventListener(eui.UIEvent.COMPLETE, function () {
                GlobleVOData.getInstance.setup();
                RES.getResByUrl(PathConfig.Language, function (data, url) {
                    App.LanguageManager.setup(data);
                    resolve();
                }, _this, RES.ResourceItem.TYPE_TEXT);
            }, _this);
        });
    };
    /**
     * 创建场景界面
     */
    Main.prototype.createGameScene = function () {
        var self = this;
        App.Init();
        //注册所有场景
        App.RegisterManager.initScene();
        //注册所有模块控制器
        App.RegisterManager.initModules();
        //音乐音效处理
        App.SoundManager.setBgOn(true);
        App.SoundManager.setEffectOn(true);
        App.SceneManager.runScene(SceneConsts.LOGIN);
    };
    return Main;
}(eui.UILayer));
__reflect(Main.prototype, "Main");
