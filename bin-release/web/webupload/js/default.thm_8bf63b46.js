window.skins={};
                function __extends(d, b) {
                    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
                        function __() {
                            this.constructor = d;
                        }
                    __.prototype = b.prototype;
                    d.prototype = new __();
                };
                window.generateEUI = {};
                generateEUI.paths = {};
                generateEUI.styles = undefined;
                generateEUI.skins = {"eui.Button":"resource/skins/eui_skins/ButtonSkin.exml","eui.CheckBox":"resource/skins/eui_skins/CheckBoxSkin.exml","eui.HScrollBar":"resource/skins/eui_skins/HScrollBarSkin.exml","eui.HSlider":"resource/skins/eui_skins/HSliderSkin.exml","eui.Panel":"resource/skins/eui_skins/PanelSkin.exml","eui.TextInput":"resource/skins/eui_skins/TextInputSkin.exml","eui.ProgressBar":"resource/skins/eui_skins/ProgressBarSkin.exml","eui.RadioButton":"resource/skins/eui_skins/RadioButtonSkin.exml","eui.Scroller":"resource/skins/eui_skins/ScrollerSkin.exml","eui.ToggleSwitch":"resource/skins/eui_skins/ToggleSwitchSkin.exml","eui.VScrollBar":"resource/skins/eui_skins/VScrollBarSkin.exml","eui.VSlider":"resource/skins/eui_skins/VSliderSkin.exml","eui.ItemRenderer":"resource/skins/eui_skins/ItemRendererSkin.exml"};generateEUI.paths['resource/skins/battle/BattleMapSkin.exml'] = window.BattleMapSkin = (function (_super) {
	__extends(BattleMapSkin, _super);
	function BattleMapSkin() {
		_super.call(this);
		this.skinParts = ["mapGroup","container"];
		
		this.elementsContent = [this.container_i()];
	}
	var _proto = BattleMapSkin.prototype;

	_proto.container_i = function () {
		var t = new eui.Group();
		this.container = t;
		t.percentHeight = 100;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		t.percentWidth = 100;
		t.elementsContent = [this.mapGroup_i()];
		return t;
	};
	_proto.mapGroup_i = function () {
		var t = new eui.Group();
		this.mapGroup = t;
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.top = 0;
		t.touchChildren = true;
		t.touchEnabled = false;
		t.percentWidth = 100;
		t.layout = this._VerticalLayout1_i();
		return t;
	};
	_proto._VerticalLayout1_i = function () {
		var t = new eui.VerticalLayout();
		t.gap = 0;
		t.horizontalAlign = "center";
		t.verticalAlign = "bottom";
		return t;
	};
	return BattleMapSkin;
})(eui.Skin);generateEUI.paths['resource/skins/battle/BattleMissionViewSkin.exml'] = window.BattleMissionViewSkin = (function (_super) {
	__extends(BattleMissionViewSkin, _super);
	var BattleMissionViewSkin$Skin1 = 	(function (_super) {
		__extends(BattleMissionViewSkin$Skin1, _super);
		function BattleMissionViewSkin$Skin1() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","battleMission_json.battleMission_stop")
					])
				,
				new eui.State ("disabled",
					[
						new eui.SetProperty("_Image1","source","battleMission_json.battleMission_stop")
					])
			];
		}
		var _proto = BattleMissionViewSkin$Skin1.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "battleMission_json.battleMission_stop";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return BattleMissionViewSkin$Skin1;
	})(eui.Skin);

	function BattleMissionViewSkin() {
		_super.call(this);
		this.skinParts = ["btn_pause","txt_score","txt_mission","txt_step"];
		
		this.height = 1280;
		this.width = 720;
		this.elementsContent = [this._Rect1_i(),this._Group5_i()];
	}
	var _proto = BattleMissionViewSkin.prototype;

	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.top = 0;
		return t;
	};
	_proto._Group5_i = function () {
		var t = new eui.Group();
		t.percentHeight = 100;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		t.percentWidth = 100;
		t.elementsContent = [this._Image1_i(),this._Group1_i(),this.btn_pause_i(),this._Image4_i(),this._Group2_i(),this._Group3_i(),this._Group4_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "battleMission_json.battleMission_bg";
		t.verticalCenter = 0;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.bottom = 0;
		t.horizontalCenter = 0;
		t.elementsContent = [this._Image2_i(),this._Image3_i()];
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 124;
		t.scale9Grid = new egret.Rectangle(24,22,8,8);
		t.source = "battleMission_json.battleMission_skill_bg";
		t.width = 288;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 124;
		t.scale9Grid = new egret.Rectangle(24,22,8,8);
		t.scaleX = -1;
		t.source = "battleMission_json.battleMission_skill_bg";
		t.width = 288;
		t.x = 574;
		t.y = 0;
		return t;
	};
	_proto.btn_pause_i = function () {
		var t = new eui.Button();
		this.btn_pause = t;
		t.label = "";
		t.name = "btn_pause_1#1";
		t.right = 21;
		t.top = 18;
		t.touchChildren = false;
		t.skinName = BattleMissionViewSkin$Skin1;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 703.09;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(20,20,47,54);
		t.source = "battleMission_json.battleMission_inBG";
		t.verticalCenter = -85.5;
		t.width = 679.97;
		return t;
	};
	_proto._Group2_i = function () {
		var t = new eui.Group();
		t.bottom = 304;
		t.horizontalCenter = 0;
		t.elementsContent = [this._Image5_i(),this._Image6_i(),this.txt_score_i()];
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.height = 60;
		t.scale9Grid = new egret.Rectangle(23,17,3,4);
		t.source = "battleMission_json.battleMission_score";
		t.width = 122;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Image6_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.height = 60;
		t.scale9Grid = new egret.Rectangle(23,17,3,4);
		t.scaleX = -1;
		t.source = "battleMission_json.battleMission_score";
		t.width = 122;
		t.x = 243.15;
		t.y = 0;
		return t;
	};
	_proto.txt_score_i = function () {
		var t = new eui.Label();
		this.txt_score = t;
		t.bold = true;
		t.fontFamily = "Microsoft YaHei";
		t.horizontalCenter = 0;
		t.stroke = 2;
		t.strokeColor = 0x7a3737;
		t.text = "分数：0";
		t.textAlign = "center";
		t.textColor = 0xffffff;
		t.verticalAlign = "middle";
		t.verticalCenter = 0;
		return t;
	};
	_proto._Group3_i = function () {
		var t = new eui.Group();
		t.bottom = 98;
		t.left = 0;
		t.elementsContent = [this._Image7_i(),this.txt_mission_i()];
		return t;
	};
	_proto._Image7_i = function () {
		var t = new eui.Image();
		t.source = "battleMission_json.battleMission_level";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.txt_mission_i = function () {
		var t = new eui.Label();
		this.txt_mission = t;
		t.bold = true;
		t.fontFamily = "Microsoft YaHei";
		t.horizontalCenter = 0;
		t.size = 24;
		t.text = "1";
		t.textAlign = "center";
		t.verticalCenter = 11;
		return t;
	};
	_proto._Group4_i = function () {
		var t = new eui.Group();
		t.bottom = 165;
		t.right = 24;
		t.elementsContent = [this._Image8_i(),this._Label1_i(),this.txt_step_i()];
		return t;
	};
	_proto._Image8_i = function () {
		var t = new eui.Image();
		t.source = "battleMission_json.battleMission_step";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.bold = true;
		t.fontFamily = "Microsoft YaHei";
		t.horizontalCenter = 0.5;
		t.text = "步数";
		t.textAlign = "center";
		t.textColor = 0x257daa;
		t.top = 24;
		return t;
	};
	_proto.txt_step_i = function () {
		var t = new eui.Label();
		this.txt_step = t;
		t.bold = true;
		t.fontFamily = "Microsoft YaHei";
		t.horizontalCenter = 0;
		t.text = "10";
		t.textAlign = "center";
		t.textColor = 0x2931bc;
		t.verticalCenter = 0;
		return t;
	};
	return BattleMissionViewSkin;
})(eui.Skin);generateEUI.paths['resource/skins/common/component/CurrencyComSkin.exml'] = window.CurrencyComSkin = (function (_super) {
	__extends(CurrencyComSkin, _super);
	function CurrencyComSkin() {
		_super.call(this);
		this.skinParts = ["txt_golds","goldGroup","txt_diamonds","diamondGroup"];
		
		this.elementsContent = [this._Group1_i()];
	}
	var _proto = CurrencyComSkin.prototype;

	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.x = 0;
		t.y = 0;
		t.layout = this._HorizontalLayout1_i();
		t.elementsContent = [this.goldGroup_i(),this.diamondGroup_i()];
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		t.gap = 10;
		t.horizontalAlign = "left";
		t.verticalAlign = "middle";
		return t;
	};
	_proto.goldGroup_i = function () {
		var t = new eui.Group();
		this.goldGroup = t;
		t.x = 0;
		t.y = 0;
		t.elementsContent = [this._Image1_i(),this.txt_golds_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.scaleX = 0.8;
		t.scaleY = 0.8;
		t.source = "frames_json.frame_currency";
		return t;
	};
	_proto.txt_golds_i = function () {
		var t = new eui.Label();
		this.txt_golds = t;
		t.bold = true;
		t.fontFamily = "Microsoft YaHei";
		t.right = 6;
		t.size = 26;
		t.text = "0000";
		t.textAlign = "right";
		t.verticalCenter = 0;
		return t;
	};
	_proto.diamondGroup_i = function () {
		var t = new eui.Group();
		this.diamondGroup = t;
		t.x = 410;
		t.y = 0;
		t.elementsContent = [this._Image2_i(),this.txt_diamonds_i()];
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.scaleX = 0.8;
		t.scaleY = 0.8;
		t.source = "frames_json.frame_currency";
		return t;
	};
	_proto.txt_diamonds_i = function () {
		var t = new eui.Label();
		this.txt_diamonds = t;
		t.bold = true;
		t.fontFamily = "Microsoft YaHei";
		t.right = 6;
		t.size = 26;
		t.text = "0000";
		t.textAlign = "right";
		t.verticalCenter = 0.5;
		return t;
	};
	return CurrencyComSkin;
})(eui.Skin);generateEUI.paths['resource/skins/battle/BattleViewSkin.exml'] = window.BattleViewSkin = (function (_super) {
	__extends(BattleViewSkin, _super);
	function BattleViewSkin() {
		_super.call(this);
		this.skinParts = ["scroller","currency"];
		
		this.height = 1280;
		this.width = 720;
		this.elementsContent = [this._Rect1_i(),this._Group1_i()];
	}
	var _proto = BattleViewSkin.prototype;

	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.percentHeight = 100;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		t.percentWidth = 100;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.percentHeight = 100;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		t.percentWidth = 100;
		t.elementsContent = [this.scroller_i(),this.currency_i()];
		return t;
	};
	_proto.scroller_i = function () {
		var t = new eui.Scroller();
		this.scroller = t;
		t.bounces = false;
		t.height = 1280;
		t.horizontalCenter = 0;
		t.touchEnabled = true;
		t.verticalCenter = 0;
		t.percentWidth = 100;
		return t;
	};
	_proto.currency_i = function () {
		var t = new CurrencyCom();
		this.currency = t;
		t.left = 8;
		t.skinName = "CurrencyComSkin";
		t.top = 8;
		return t;
	};
	return BattleViewSkin;
})(eui.Skin);generateEUI.paths['resource/skins/battle/item/MapBtnItemSkin.exml'] = window.MapBtnItemSkin = (function (_super) {
	__extends(MapBtnItemSkin, _super);
	function MapBtnItemSkin() {
		_super.call(this);
		this.skinParts = ["itemImg","txt_index","btn_level"];
		
		this.elementsContent = [this.btn_level_i()];
	}
	var _proto = MapBtnItemSkin.prototype;

	_proto.btn_level_i = function () {
		var t = new eui.Group();
		this.btn_level = t;
		t.horizontalCenter = 0;
		t.name = "btn_level_1#1";
		t.touchChildren = false;
		t.verticalCenter = 0;
		t.elementsContent = [this.itemImg_i(),this.txt_index_i()];
		return t;
	};
	_proto.itemImg_i = function () {
		var t = new eui.Image();
		this.itemImg = t;
		t.source = "battle_json.battle_black";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.txt_index_i = function () {
		var t = new eui.Label();
		this.txt_index = t;
		t.horizontalCenter = 0.5;
		t.text = "0";
		t.textAlign = "center";
		t.verticalAlign = "middle";
		t.verticalCenter = -9;
		return t;
	};
	return MapBtnItemSkin;
})(eui.Skin);generateEUI.paths['resource/skins/battle/panel/MissionPanelSkin.exml'] = window.MissionPanelSkin = (function (_super) {
	__extends(MissionPanelSkin, _super);
	function MissionPanelSkin() {
		_super.call(this);
		this.skinParts = ["txt_title","txt_condition","btn_start","btn_close"];
		
		this.elementsContent = [this._Group1_i()];
	}
	var _proto = MissionPanelSkin.prototype;

	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		t.elementsContent = [this._Image1_i(),this.txt_title_i(),this._Label1_i(),this.txt_condition_i(),this.btn_start_i(),this.btn_close_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "battle_json.battle_mission_bg";
		t.verticalCenter = 0;
		return t;
	};
	_proto.txt_title_i = function () {
		var t = new eui.Label();
		this.txt_title = t;
		t.bold = true;
		t.fontFamily = "Microsoft YaHei";
		t.left = 35;
		t.size = 30;
		t.text = "第1关";
		t.textAlign = "left";
		t.top = 28;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.bold = true;
		t.fontFamily = "Microsoft YaHei";
		t.horizontalCenter = 1.5;
		t.size = 30;
		t.stroke = 2;
		t.strokeColor = 0x433656;
		t.text = "通关条件";
		t.textAlign = "center";
		t.textColor = 0xffffff;
		t.verticalCenter = 22.5;
		return t;
	};
	_proto.txt_condition_i = function () {
		var t = new eui.Label();
		this.txt_condition = t;
		t.bold = true;
		t.fontFamily = "Microsoft YaHei";
		t.horizontalCenter = 0;
		t.size = 30;
		t.stroke = 2;
		t.strokeColor = 0xd65653;
		t.text = "消除分数达到800分";
		t.textAlign = "center";
		t.textColor = 0xFFFFFF;
		t.verticalCenter = 85.5;
		return t;
	};
	_proto.btn_start_i = function () {
		var t = new eui.Group();
		this.btn_start = t;
		t.bottom = 22;
		t.name = "btn_start_1#1";
		t.right = 25;
		t.touchChildren = false;
		t.elementsContent = [this._Image2_i(),this._Label2_i()];
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.source = "buttons_json.btn_red";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Label2_i = function () {
		var t = new eui.Label();
		t.bold = true;
		t.fontFamily = "Microsoft YaHei";
		t.horizontalCenter = 0;
		t.size = 30;
		t.text = "闯关";
		t.textAlign = "center";
		t.verticalCenter = 0;
		return t;
	};
	_proto.btn_close_i = function () {
		var t = new eui.Group();
		this.btn_close = t;
		t.bottom = 22;
		t.left = 25;
		t.name = "btn_start_1#1";
		t.touchChildren = false;
		t.elementsContent = [this._Image3_i(),this._Label3_i()];
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.source = "buttons_json.btn_blue";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Label3_i = function () {
		var t = new eui.Label();
		t.bold = true;
		t.fontFamily = "Microsoft YaHei";
		t.horizontalCenter = 0;
		t.size = 30;
		t.text = "关闭";
		t.textAlign = "center";
		t.verticalCenter = 0;
		return t;
	};
	return MissionPanelSkin;
})(eui.Skin);generateEUI.paths['resource/skins/common/component/ButtonComSkin.exml'] = window.ButtonComSkin = (function (_super) {
	__extends(ButtonComSkin, _super);
	function ButtonComSkin() {
		_super.call(this);
		this.skinParts = ["iconImg","btn_click"];
		
		this.elementsContent = [this.btn_click_i()];
	}
	var _proto = ButtonComSkin.prototype;

	_proto.btn_click_i = function () {
		var t = new eui.Group();
		this.btn_click = t;
		t.height = 96;
		t.left = 0;
		t.name = "btn_click_1#1";
		t.top = 0;
		t.touchChildren = false;
		t.width = 96;
		t.elementsContent = [this.iconImg_i()];
		return t;
	};
	_proto.iconImg_i = function () {
		var t = new eui.Image();
		this.iconImg = t;
		t.source = "hallIcons_json.more_icon";
		t.x = 0;
		t.y = 0;
		return t;
	};
	return ButtonComSkin;
})(eui.Skin);generateEUI.paths['resource/skins/eui_skins/ButtonSkin.exml'] = window.skins.ButtonSkin = (function (_super) {
	__extends(ButtonSkin, _super);
	function ButtonSkin() {
		_super.call(this);
		this.skinParts = ["labelDisplay","iconDisplay"];
		
		this.minHeight = 50;
		this.minWidth = 100;
		this.elementsContent = [this._Image1_i(),this.labelDisplay_i(),this.iconDisplay_i()];
		this.states = [
			new eui.State ("up",
				[
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","source","button_down_png")
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Image1","alpha",0.5)
				])
		];
	}
	var _proto = ButtonSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.percentHeight = 100;
		t.scale9Grid = new egret.Rectangle(1,3,8,8);
		t.source = "button_up_png";
		t.percentWidth = 100;
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.bottom = 8;
		t.left = 8;
		t.right = 8;
		t.size = 20;
		t.textAlign = "center";
		t.textColor = 0xFFFFFF;
		t.top = 8;
		t.verticalAlign = "middle";
		return t;
	};
	_proto.iconDisplay_i = function () {
		var t = new eui.Image();
		this.iconDisplay = t;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		return t;
	};
	return ButtonSkin;
})(eui.Skin);generateEUI.paths['resource/skins/eui_skins/CheckBoxSkin.exml'] = window.skins.CheckBoxSkin = (function (_super) {
	__extends(CheckBoxSkin, _super);
	function CheckBoxSkin() {
		_super.call(this);
		this.skinParts = ["labelDisplay"];
		
		this.elementsContent = [this._Group1_i()];
		this.states = [
			new eui.State ("up",
				[
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","alpha",0.7)
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Image1","alpha",0.5)
				])
			,
			new eui.State ("upAndSelected",
				[
					new eui.SetProperty("_Image1","source","checkbox_select_up_png")
				])
			,
			new eui.State ("downAndSelected",
				[
					new eui.SetProperty("_Image1","source","checkbox_select_down_png")
				])
			,
			new eui.State ("disabledAndSelected",
				[
					new eui.SetProperty("_Image1","source","checkbox_select_disabled_png")
				])
		];
	}
	var _proto = CheckBoxSkin.prototype;

	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.layout = this._HorizontalLayout1_i();
		t.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		t.verticalAlign = "middle";
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.alpha = 1;
		t.fillMode = "scale";
		t.source = "checkbox_unselect_png";
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.fontFamily = "Tahoma";
		t.size = 20;
		t.textAlign = "center";
		t.textColor = 0x707070;
		t.verticalAlign = "middle";
		return t;
	};
	return CheckBoxSkin;
})(eui.Skin);generateEUI.paths['resource/skins/eui_skins/HScrollBarSkin.exml'] = window.skins.HScrollBarSkin = (function (_super) {
	__extends(HScrollBarSkin, _super);
	function HScrollBarSkin() {
		_super.call(this);
		this.skinParts = ["thumb"];
		
		this.minHeight = 8;
		this.minWidth = 20;
		this.elementsContent = [this.thumb_i()];
	}
	var _proto = HScrollBarSkin.prototype;

	_proto.thumb_i = function () {
		var t = new eui.Image();
		this.thumb = t;
		t.height = 8;
		t.scale9Grid = new egret.Rectangle(3,3,2,2);
		t.source = "roundthumb_png";
		t.verticalCenter = 0;
		t.width = 30;
		return t;
	};
	return HScrollBarSkin;
})(eui.Skin);generateEUI.paths['resource/skins/eui_skins/HSliderSkin.exml'] = window.skins.HSliderSkin = (function (_super) {
	__extends(HSliderSkin, _super);
	function HSliderSkin() {
		_super.call(this);
		this.skinParts = ["track","thumb"];
		
		this.minHeight = 8;
		this.minWidth = 20;
		this.elementsContent = [this.track_i(),this.thumb_i()];
	}
	var _proto = HSliderSkin.prototype;

	_proto.track_i = function () {
		var t = new eui.Image();
		this.track = t;
		t.height = 6;
		t.scale9Grid = new egret.Rectangle(1,1,4,4);
		t.source = "track_sb_png";
		t.verticalCenter = 0;
		t.percentWidth = 100;
		return t;
	};
	_proto.thumb_i = function () {
		var t = new eui.Image();
		this.thumb = t;
		t.source = "thumb_png";
		t.verticalCenter = 0;
		return t;
	};
	return HSliderSkin;
})(eui.Skin);generateEUI.paths['resource/skins/eui_skins/ItemRendererSkin.exml'] = window.skins.ItemRendererSkin = (function (_super) {
	__extends(ItemRendererSkin, _super);
	function ItemRendererSkin() {
		_super.call(this);
		this.skinParts = ["labelDisplay"];
		
		this.minHeight = 50;
		this.minWidth = 100;
		this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
		this.states = [
			new eui.State ("up",
				[
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","source","button_down_png")
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Image1","alpha",0.5)
				])
		];
		
		eui.Binding.$bindProperties(this, ["hostComponent.data"],[0],this.labelDisplay,"text");
	}
	var _proto = ItemRendererSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.percentHeight = 100;
		t.scale9Grid = new egret.Rectangle(1,3,8,8);
		t.source = "button_up_png";
		t.percentWidth = 100;
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.bottom = 8;
		t.fontFamily = "Tahoma";
		t.left = 8;
		t.right = 8;
		t.size = 20;
		t.textAlign = "center";
		t.textColor = 0xFFFFFF;
		t.top = 8;
		t.verticalAlign = "middle";
		return t;
	};
	return ItemRendererSkin;
})(eui.Skin);generateEUI.paths['resource/skins/eui_skins/PanelSkin.exml'] = window.skins.PanelSkin = (function (_super) {
	__extends(PanelSkin, _super);
	function PanelSkin() {
		_super.call(this);
		this.skinParts = ["titleDisplay","moveArea","closeButton"];
		
		this.minHeight = 230;
		this.minWidth = 450;
		this.elementsContent = [this._Image1_i(),this.moveArea_i(),this.closeButton_i()];
	}
	var _proto = PanelSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.scale9Grid = new egret.Rectangle(2,2,12,12);
		t.source = "border_png";
		t.top = 0;
		return t;
	};
	_proto.moveArea_i = function () {
		var t = new eui.Group();
		this.moveArea = t;
		t.height = 45;
		t.left = 0;
		t.right = 0;
		t.top = 0;
		t.elementsContent = [this._Image2_i(),this.titleDisplay_i()];
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.source = "header_png";
		t.top = 0;
		return t;
	};
	_proto.titleDisplay_i = function () {
		var t = new eui.Label();
		this.titleDisplay = t;
		t.fontFamily = "Tahoma";
		t.left = 15;
		t.right = 5;
		t.size = 20;
		t.textColor = 0xFFFFFF;
		t.verticalCenter = 0;
		t.wordWrap = false;
		return t;
	};
	_proto.closeButton_i = function () {
		var t = new eui.Button();
		this.closeButton = t;
		t.bottom = 5;
		t.horizontalCenter = 0;
		t.label = "close";
		return t;
	};
	return PanelSkin;
})(eui.Skin);generateEUI.paths['resource/skins/eui_skins/ProgressBarSkin.exml'] = window.skins.ProgressBarSkin = (function (_super) {
	__extends(ProgressBarSkin, _super);
	function ProgressBarSkin() {
		_super.call(this);
		this.skinParts = ["thumb","labelDisplay"];
		
		this.minHeight = 18;
		this.minWidth = 30;
		this.elementsContent = [this._Image1_i(),this.thumb_i(),this.labelDisplay_i()];
	}
	var _proto = ProgressBarSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.percentHeight = 100;
		t.scale9Grid = new egret.Rectangle(1,1,4,4);
		t.source = "track_pb_png";
		t.verticalCenter = 0;
		t.percentWidth = 100;
		return t;
	};
	_proto.thumb_i = function () {
		var t = new eui.Image();
		this.thumb = t;
		t.percentHeight = 100;
		t.source = "thumb_pb_png";
		t.percentWidth = 100;
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.fontFamily = "Tahoma";
		t.horizontalCenter = 0;
		t.size = 15;
		t.textAlign = "center";
		t.textColor = 0x707070;
		t.verticalAlign = "middle";
		t.verticalCenter = 0;
		return t;
	};
	return ProgressBarSkin;
})(eui.Skin);generateEUI.paths['resource/skins/eui_skins/RadioButtonSkin.exml'] = window.skins.RadioButtonSkin = (function (_super) {
	__extends(RadioButtonSkin, _super);
	function RadioButtonSkin() {
		_super.call(this);
		this.skinParts = ["labelDisplay"];
		
		this.elementsContent = [this._Group1_i()];
		this.states = [
			new eui.State ("up",
				[
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","alpha",0.7)
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Image1","alpha",0.5)
				])
			,
			new eui.State ("upAndSelected",
				[
					new eui.SetProperty("_Image1","source","radiobutton_select_up_png")
				])
			,
			new eui.State ("downAndSelected",
				[
					new eui.SetProperty("_Image1","source","radiobutton_select_down_png")
				])
			,
			new eui.State ("disabledAndSelected",
				[
					new eui.SetProperty("_Image1","source","radiobutton_select_disabled_png")
				])
		];
	}
	var _proto = RadioButtonSkin.prototype;

	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.layout = this._HorizontalLayout1_i();
		t.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		t.verticalAlign = "middle";
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.alpha = 1;
		t.fillMode = "scale";
		t.source = "radiobutton_unselect_png";
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.fontFamily = "Tahoma";
		t.size = 20;
		t.textAlign = "center";
		t.textColor = 0x707070;
		t.verticalAlign = "middle";
		return t;
	};
	return RadioButtonSkin;
})(eui.Skin);generateEUI.paths['resource/skins/eui_skins/ScrollerSkin.exml'] = window.skins.ScrollerSkin = (function (_super) {
	__extends(ScrollerSkin, _super);
	function ScrollerSkin() {
		_super.call(this);
		this.skinParts = ["horizontalScrollBar","verticalScrollBar"];
		
		this.minHeight = 20;
		this.minWidth = 20;
		this.elementsContent = [this.horizontalScrollBar_i(),this.verticalScrollBar_i()];
	}
	var _proto = ScrollerSkin.prototype;

	_proto.horizontalScrollBar_i = function () {
		var t = new eui.HScrollBar();
		this.horizontalScrollBar = t;
		t.bottom = 0;
		t.percentWidth = 100;
		return t;
	};
	_proto.verticalScrollBar_i = function () {
		var t = new eui.VScrollBar();
		this.verticalScrollBar = t;
		t.percentHeight = 100;
		t.right = 0;
		return t;
	};
	return ScrollerSkin;
})(eui.Skin);generateEUI.paths['resource/skins/eui_skins/TextInputSkin.exml'] = window.skins.TextInputSkin = (function (_super) {
	__extends(TextInputSkin, _super);
	function TextInputSkin() {
		_super.call(this);
		this.skinParts = ["textDisplay","promptDisplay"];
		
		this.minHeight = 40;
		this.minWidth = 300;
		this.elementsContent = [this._Image1_i(),this._Rect1_i(),this.textDisplay_i()];
		this.promptDisplay_i();
		
		this.states = [
			new eui.State ("normal",
				[
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("textDisplay","textColor",0xff0000)
				])
			,
			new eui.State ("normalWithPrompt",
				[
					new eui.AddItems("promptDisplay","",1,"")
				])
			,
			new eui.State ("disabledWithPrompt",
				[
					new eui.AddItems("promptDisplay","",1,"")
				])
		];
	}
	var _proto = TextInputSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.percentHeight = 100;
		t.scale9Grid = new egret.Rectangle(1,3,8,8);
		t.source = "button_up_png";
		t.percentWidth = 100;
		return t;
	};
	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.fillColor = 0xffffff;
		t.percentHeight = 100;
		t.percentWidth = 100;
		return t;
	};
	_proto.textDisplay_i = function () {
		var t = new eui.EditableText();
		this.textDisplay = t;
		t.height = 24;
		t.left = "10";
		t.right = "10";
		t.size = 20;
		t.textColor = 0x000000;
		t.verticalCenter = "0";
		t.percentWidth = 100;
		return t;
	};
	_proto.promptDisplay_i = function () {
		var t = new eui.Label();
		this.promptDisplay = t;
		t.height = 24;
		t.left = 10;
		t.right = 10;
		t.size = 20;
		t.textColor = 0xa9a9a9;
		t.touchEnabled = false;
		t.verticalCenter = 0;
		t.percentWidth = 100;
		return t;
	};
	return TextInputSkin;
})(eui.Skin);generateEUI.paths['resource/skins/eui_skins/ToggleSwitchSkin.exml'] = window.skins.ToggleSwitchSkin = (function (_super) {
	__extends(ToggleSwitchSkin, _super);
	function ToggleSwitchSkin() {
		_super.call(this);
		this.skinParts = [];
		
		this.elementsContent = [this._Image1_i(),this._Image2_i()];
		this.states = [
			new eui.State ("up",
				[
					new eui.SetProperty("_Image1","source","off_png")
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","source","off_png")
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Image1","source","off_png")
				])
			,
			new eui.State ("upAndSelected",
				[
					new eui.SetProperty("_Image2","horizontalCenter",18)
				])
			,
			new eui.State ("downAndSelected",
				[
					new eui.SetProperty("_Image2","horizontalCenter",18)
				])
			,
			new eui.State ("disabledAndSelected",
				[
					new eui.SetProperty("_Image2","horizontalCenter",18)
				])
		];
	}
	var _proto = ToggleSwitchSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.source = "on_png";
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		this._Image2 = t;
		t.horizontalCenter = -18;
		t.source = "handle_png";
		t.verticalCenter = 0;
		return t;
	};
	return ToggleSwitchSkin;
})(eui.Skin);generateEUI.paths['resource/skins/eui_skins/VScrollBarSkin.exml'] = window.skins.VScrollBarSkin = (function (_super) {
	__extends(VScrollBarSkin, _super);
	function VScrollBarSkin() {
		_super.call(this);
		this.skinParts = ["thumb"];
		
		this.minHeight = 20;
		this.minWidth = 8;
		this.elementsContent = [this.thumb_i()];
	}
	var _proto = VScrollBarSkin.prototype;

	_proto.thumb_i = function () {
		var t = new eui.Image();
		this.thumb = t;
		t.height = 30;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(3,3,2,2);
		t.source = "roundthumb_png";
		t.width = 8;
		return t;
	};
	return VScrollBarSkin;
})(eui.Skin);generateEUI.paths['resource/skins/eui_skins/VSliderSkin.exml'] = window.skins.VSliderSkin = (function (_super) {
	__extends(VSliderSkin, _super);
	function VSliderSkin() {
		_super.call(this);
		this.skinParts = ["track","thumb"];
		
		this.minHeight = 30;
		this.minWidth = 25;
		this.elementsContent = [this.track_i(),this.thumb_i()];
	}
	var _proto = VSliderSkin.prototype;

	_proto.track_i = function () {
		var t = new eui.Image();
		this.track = t;
		t.percentHeight = 100;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(1,1,4,4);
		t.source = "track_png";
		t.width = 7;
		return t;
	};
	_proto.thumb_i = function () {
		var t = new eui.Image();
		this.thumb = t;
		t.horizontalCenter = 0;
		t.source = "thumb_png";
		return t;
	};
	return VSliderSkin;
})(eui.Skin);generateEUI.paths['resource/skins/hall/HallViewSkin.exml'] = window.HallViewSkin = (function (_super) {
	__extends(HallViewSkin, _super);
	var HallViewSkin$Skin2 = 	(function (_super) {
		__extends(HallViewSkin$Skin2, _super);
		function HallViewSkin$Skin2() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","hall_json.hall_icon")
					])
				,
				new eui.State ("disabled",
					[
						new eui.SetProperty("_Image1","source","hall_json.hall_icon")
					])
			];
		}
		var _proto = HallViewSkin$Skin2.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "hall_json.hall_icon";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return HallViewSkin$Skin2;
	})(eui.Skin);

	function HallViewSkin() {
		_super.call(this);
		this.skinParts = ["btn_checkpoint","currency"];
		
		this.height = 1280;
		this.width = 720;
		this.elementsContent = [this._Group1_i()];
	}
	var _proto = HallViewSkin.prototype;

	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.percentHeight = 100;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		t.percentWidth = 100;
		t.elementsContent = [this._Image1_i(),this._Image2_i(),this.btn_checkpoint_i(),this.currency_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.source = "hall_bg";
		t.top = 0;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.source = "hall_json.hall_bg_down";
		t.x = 360;
		t.y = 1280;
		return t;
	};
	_proto.btn_checkpoint_i = function () {
		var t = new eui.Button();
		this.btn_checkpoint = t;
		t.horizontalCenter = 0;
		t.label = "";
		t.name = "btn_checkpoint_1#1";
		t.touchChildren = false;
		t.verticalCenter = 0;
		t.skinName = HallViewSkin$Skin2;
		return t;
	};
	_proto.currency_i = function () {
		var t = new CurrencyCom();
		this.currency = t;
		t.left = 12;
		t.skinName = "CurrencyComSkin";
		t.top = 14;
		return t;
	};
	return HallViewSkin;
})(eui.Skin);generateEUI.paths['resource/skins/loading/LoadingUISkin.exml'] = window.LoadingUISkin = (function (_super) {
	__extends(LoadingUISkin, _super);
	function LoadingUISkin() {
		_super.call(this);
		this.skinParts = ["txtMsg"];
		
		this.height = 300;
		this.width = 400;
		this.elementsContent = [this.txtMsg_i()];
	}
	var _proto = LoadingUISkin.prototype;

	_proto.txtMsg_i = function () {
		var t = new eui.Label();
		this.txtMsg = t;
		t.bold = true;
		t.fontFamily = "Microsoft YaHei";
		t.horizontalCenter = 0;
		t.text = "资源加载中...";
		t.textAlign = "center";
		t.verticalCenter = 0;
		return t;
	};
	return LoadingUISkin;
})(eui.Skin);generateEUI.paths['resource/skins/login/LoginViewSkin.exml'] = window.LoginViewSkin = (function (_super) {
	__extends(LoginViewSkin, _super);
	var LoginViewSkin$Skin3 = 	(function (_super) {
		__extends(LoginViewSkin$Skin3, _super);
		function LoginViewSkin$Skin3() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","login_json.login_startBtn")
					])
				,
				new eui.State ("disabled",
					[
						new eui.SetProperty("_Image1","source","login_json.login_startBtn")
					])
			];
		}
		var _proto = LoginViewSkin$Skin3.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "login_json.login_startBtn";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return LoginViewSkin$Skin3;
	})(eui.Skin);

	var LoginViewSkin$Skin4 = 	(function (_super) {
		__extends(LoginViewSkin$Skin4, _super);
		function LoginViewSkin$Skin4() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","login_json.login_saizi")
					])
				,
				new eui.State ("disabled",
					[
						new eui.SetProperty("_Image1","source","login_json.login_saizi")
					])
			];
		}
		var _proto = LoginViewSkin$Skin4.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "login_json.login_saizi";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return LoginViewSkin$Skin4;
	})(eui.Skin);

	function LoginViewSkin() {
		_super.call(this);
		this.skinParts = ["bgImg","btn_enter","btn_random","txt_input"];
		
		this.height = 1280;
		this.width = 720;
		this.elementsContent = [this.bgImg_i(),this._Image1_i(),this.btn_enter_i(),this.btn_random_i(),this.txt_input_i()];
	}
	var _proto = LoginViewSkin.prototype;

	_proto.bgImg_i = function () {
		var t = new eui.Image();
		this.bgImg = t;
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.scale9Grid = new egret.Rectangle(85,396,511,148);
		t.source = "login_json.login_bg";
		t.top = 0;
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "login_json.login_name_icon";
		t.x = 178;
		t.y = 464.12;
		return t;
	};
	_proto.btn_enter_i = function () {
		var t = new eui.Button();
		this.btn_enter = t;
		t.horizontalCenter = 0;
		t.label = "";
		t.name = "btn_enter_1#1";
		t.touchChildren = false;
		t.x = 221;
		t.y = 637;
		t.skinName = LoginViewSkin$Skin3;
		return t;
	};
	_proto.btn_random_i = function () {
		var t = new eui.Button();
		this.btn_random = t;
		t.label = "";
		t.name = "btn_random_1#1";
		t.right = 85;
		t.touchChildren = false;
		t.x = 551;
		t.y = 518.62;
		t.skinName = LoginViewSkin$Skin4;
		return t;
	};
	_proto.txt_input_i = function () {
		var t = new eui.EditableText();
		this.txt_input = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bold = true;
		t.fontFamily = "Microsoft YaHei";
		t.height = 71.21;
		t.horizontalCenter = "15";
		t.prompt = "请输入角色名";
		t.promptColor = 0x000000;
		t.size = 40;
		t.textAlign = "center";
		t.textColor = 0x000000;
		t.verticalAlign = "middle";
		t.width = 288;
		t.x = 231;
		t.y = 527.16;
		return t;
	};
	return LoginViewSkin;
})(eui.Skin);