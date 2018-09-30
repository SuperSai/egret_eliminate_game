class BaseEuiAlert extends BaseEuiView {

	private _maskRect: eui.Rect;
	public btn_close: eui.Group;
	protected isMaskTouch: boolean = true;
	private _layer: number;
	private _viewShowType: number;
	public effectCallBack: Function;

	public constructor($controller: BaseController, $layer: number, $skinName: string, $viewShowType: number = VIEW_SHOW_TYPE.UP) {
		super($controller, $layer);
		this.skinName = $skinName;
		this._layer = $layer;
		this._viewShowType = $viewShowType;
	}

	/** 对面板进行显示初始化，用于子类继承 */
	public initUI(): void {
		super.initUI();
		let self = this;
		if (!self._maskRect) {
			self._maskRect = self.getMask(0);
			self.addChild(self._maskRect);
		}
		App.LayerManager.addToLayer(self._maskRect, this._layer);
		self.myParent.setChildIndex(self._maskRect, 0);

	}

	public initData(): void {
		super.initData();
		let self = this;
		App.EffectUtils.viewShowEffect(self, self._viewShowType, self.effectCallBack);
	}

	public addEvents(): void {
		super.addEvents();
		let self = this;
		self.isMaskTouch && self._maskRect && self._maskRect.addEventListener(egret.TouchEvent.TOUCH_TAP, self.onMaskHandler, self);
		self.btn_close && self.btn_close.addEventListener(egret.TouchEvent.TOUCH_TAP, self.onClosePanel, self);
	}

	public removeEvents(): void {
		super.removeEvents();
		let self = this;
		self.btn_close && self.btn_close.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.onClosePanel, self);
		self.isMaskTouch && self._maskRect && self._maskRect.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.onMaskHandler, self);
	}

	protected onMaskHandler() {
		let self = this;
		App.DisplayUtils.removeFromParent(self._maskRect);
		self._maskRect = null;
		App.ViewManager.closeView(self);
	}

	protected onClosePanel(): void {
		let self = this;
		App.DisplayUtils.removeFromParent(self._maskRect);
		self._maskRect = null;
		App.ViewManager.closeView(self);
	}

	/** 创建遮罩 */
	protected getMask(maskAlpha) {
		let rect = new eui.Rect();
		rect.touchEnabled = true;
		rect.percentWidth = 100;
		rect.percentHeight = 100;
		rect.fillColor = 0x0;
		rect.fillAlpha = maskAlpha;
		return rect;
	}

	set maskRect(value: eui.Rect) {
		this._maskRect = value;
	}

	get maskRect(): eui.Rect {
		return this._maskRect;
	}
}