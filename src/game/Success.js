import { Container, Graphics, Loader, Text, TilingSprite } from 'pixi.js';
const loader = Loader.shared;

export default class Success extends Container {
	constructor(bounds) {
		super();
		Object.assign(this, {
			bounds: bounds,
			bg: new Graphics(),
			bgSprite: new TilingSprite(loader.resources['rock'].texture, 300, 200),
			col: 0x444444,
			msg:  new Text('well done!\nPress any key\nto continue', textStyle)
		});
		this.bg.lineStyle(3, this.col).drawRect(-150, -100, 300, 200).endFill();
		this.bgSprite.anchor.set(0.5);
		this.msg.anchor.set(0.5)
		this.addChild(this.bgSprite, this.bg, this.msg);
		this.position.set(this.bounds.width / 2, this.bounds.height * 1.5);
		this.zIndex = 10;
	}
	show() {
		if (this.y > this.bounds.height / 2) {
			this.position.set(this.position.x, this.position.y - 15);
		} else {
			this.bg.clear().lineStyle(3, this.col).drawRect(-150, -100, 300, 200).endFill();
			this.col = 0x00ffff;
			this.msg.style.fill = this.col;
		}
	}
	hide() {
		if (this.y < this.bounds.height * 1.5) {
			this.position.set(this.position.x, this.position.y + 15);
		}
		this.bg.clear().lineStyle(3, this.col).drawRect(-150, -100, 300, 200).endFill();
		this.col = 0x00ffff;
		this.msg.style.fill = this.col;
		this.col = 0x444444;
		this.msg.style.fill = this.col;
	}
}

const textStyle = {
	align: 'center',
	fill: 0xffffff,
	fontSize: 16,
	fontFamily: 'Press Start 2P'
}