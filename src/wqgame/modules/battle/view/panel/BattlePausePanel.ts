/** 
 * 战斗暂停面板
 */
class BattlePausePanel extends BaseEuiAlert {

	public btn_exit: eui.Group;
	public btn_cancel: eui.Group;

	public constructor($controller: BaseController, $layer: number) {
		super($controller, $layer, SkinName.BattlePausePanelSkin);
		let self = this;
		self.cacheAsBitmap = true;
	}

	public addEvents(): void {
		super.addEvents();
		let self = this;
		self.btn_exit.addEventListener(egret.TouchEvent.TOUCH_TAP, self.onExitHandler, self);
		self.btn_cancel.addEventListener(egret.TouchEvent.TOUCH_TAP, self.onCancelHandler, self);
		self.setBtnEffect(["btn_exit", "btn_cancel"]);
	}

	public removeEvents(): void {
		super.removeEvents();
		let self = this;
		self.btn_exit.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.onExitHandler, self);
		self.btn_cancel.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.onCancelHandler, self);
	}

	private onExitHandler(): void {
		let self = this;
		App.ViewManager.close(ViewConst.BattlePausePanel);
		App.ViewManager.close(ViewConst.BattleMission);
	}

	private onCancelHandler(): void {
		let self = this;
		App.ViewManager.close(ViewConst.BattlePausePanel);
	}

}