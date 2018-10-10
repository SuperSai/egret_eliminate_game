/**
 * 通用工具类
 */
class CommonUtils extends BaseClass {
	public constructor() {
		super();
	}

	private _token: number = 0;
	public get Token(): number {
		return this._token++;
	}

    /**
     * 给字体添加描边
     * @param lable      文字
     * @param color      表示文本的描边颜色
     * @param width      描边宽度。
     */
	public addLableStrokeColor(lable: eui.Label, color: any, width: any): void {
		lable.strokeColor = color;
		lable.stroke = width;
	}

    /**
     * 锁屏
     */
	public lock(): void {
		var stage: egret.Stage = App.StageUtils.getStage();
		stage.$children.forEach(child => {
			if (child instanceof egret.DisplayObjectContainer) {
				child.touchEnabled = child.touchChildren = false;
			}
		})
	}

    /**
     * 解屏
     */
	public unlock(): void {
		var stage: egret.Stage = App.StageUtils.getStage();
		stage.$children.forEach(child => {
			if (child instanceof egret.DisplayObjectContainer) {
				child.touchEnabled = child.touchChildren = true;
			}
		})
	}

    /**
     * 万字的显示
     * @param label
     * @param num
     */
	public labelIsOverLenght = function (label, num) {
		var str = null;
		if (num < 100000) {
			str = num;
		}
		else if (num < 1000000) {
			str = Math.floor(num / 1000 / 10).toString() + "万";
		}
		else {
			str = Math.floor(num / 10000).toString() + "万";
		}
		label.text = str;
	};

    /**
     * int64转number
     * @param obj
     * @returns {number}
     */
	public int64ToNumber(obj) {
		return parseInt(obj.toString());
	}

	/** 获取2点之间的移动速度 */
	public getSpeed(targetP2: egret.Point, currentP1: egret.Point, SpeedNum: number): egret.Point {

		var speed: egret.Point = new egret.Point();
		var hypotenuse: number = egret.Point.distance(targetP2, currentP1);// App.MathUtils.getDistance(targetP2.x, targetP2.y, currentP1.x, currentP1.y);
		if (hypotenuse == 0) {
			speed.x = 0;
			speed.y = 0;
			return speed;
		}
		speed.x = SpeedNum * (targetP2.x - currentP1.x) / hypotenuse;
		speed.y = SpeedNum * (targetP2.y - currentP1.y) / hypotenuse;
		return speed;
	}

	public numPrecentage(cint: number, mint: number, countCop: number): number {
		var value: number = Math.floor(cint / mint * countCop);
		if (value > countCop) {
			value = countCop;
		}
		return value;
	}

	public formatString(argu) {
		var i = 0, a, f = argu[i++], o = [], m, p, c, x, s = '';
		while (f) {
			if (m = /^[^\x25]+/.exec(f)) {
				o.push(m[0]);
			}
			else if (m = /^\x25{2}/.exec(f)) {
				o.push('%');
			}
			else if (m = /^\x25(?:(\d+)\$)?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-fosuxX])/.exec(f)) {
				if (((a = argu[m[1] || i++]) == null) || (a == undefined)) {
					throw ('Too few arguments.');
				}
				if (/[^s]/.test(m[7]) && (typeof (a) != 'number')) {
					throw ('Expecting number but found ' + typeof (a));
				}
				switch (m[7]) {
					case 'b':
						a = a.toString(2);
						break;
					case 'c':
						a = String.fromCharCode(a);
						break;
					case 'd':
						a = parseInt(a);
						break;
					case 'e':
						a = m[6] ? a.toExponential(m[6]) : a.toExponential();
						break;
					case 'f':
						a = m[6] ? parseFloat(a).toFixed(m[6]) : parseFloat(a);
						break;
					case 'o':
						a = a.toString(8);
						break;
					case 's':
						a = ((a = String(a)) && m[6] ? a.substring(0, m[6]) : a);
						break;
					case 'u':
						a = Math.abs(a);
						break;
					case 'x':
						a = a.toString(16);
						break;
					case 'X':
						a = a.toString(16).toUpperCase();
						break;
				}
				a = (/[def]/.test(m[7]) && m[2] && a >= 0 ? '+' + a : a);
				c = m[3] ? m[3] == '0' ? '0' : m[3].charAt(1) : ' ';
				x = m[5] - String(a).length - s.length;
				p = m[5] ? this.str_repeat(c, x) : '';
				o.push(s + (m[4] ? a + p : p + a));
			}
			else {
				throw ('Huh ?!');
			}
			f = f.substring(m[0].length);
		}
		return o.join('');
	}

	public str_repeat(str, num) {
		return new Array(num + 1).join(str);
	}
}
