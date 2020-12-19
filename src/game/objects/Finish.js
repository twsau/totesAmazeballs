import { Loader, TilingSprite } from 'pixi.js';
import { Bodies, Body } from 'matter-js';
const loader = Loader.shared;

// default kwargs
let angle = 0;
let isStatic = true;
let texture = 'sandstone';

export default class Platform {
	constructor(x, y, w, h) {
		Object.assign(this, {
			body: Bodies.rectangle(x, y, w / 5, h / 5, {
				isStatic: true,
				isSensor: true,
				label: `finish`
			}),
			sprite: new TilingSprite(loader.resources['start'].texture, w, h)
		})
		this.sprite.anchor.set(0.5);
		this.sprite.position.set(this.body.position.x, this.body.position.y);
		this.sprite.zIndex = 1;
	}
	update() {
		this.sprite.position.set(this.body.position.x, this.body.position.y);
		this.sprite.rotation = this.body.angle;
	}
}