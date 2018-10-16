
/**
 * 大Loading
 */
class BigLoading extends egret.Sprite implements RES.PromiseTaskReporter {

    private Bg: egret.Bitmap;
    private textField: egret.TextField;

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.createView, this);
    }

    private createView(): void {
        let self = this;
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
    }

    public onProgress(current: number, total: number): void {
        if (this.textField) {
            this.textField.text = `Loading...${current}/${total}`;
        }
    }
}
