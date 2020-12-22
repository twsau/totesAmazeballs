import { Loader, TilingSprite } from 'pixi.js';
import { DropShadowFilter } from 'pixi-filters';
import { Bodies } from 'matter-js';
const loader = Loader.shared;

let texture = 'sandstone';

export default class Wall {
	constructor(x, y, w, h, kwargs) {
		if (kwargs) {
			texture = kwargs.texture ? kwargs.texture : 'sandstone';
		}
		this.body = Bodies.rectangle(x, y, w, h, {isSensor: true, isStatic: true});
		this.sprite = new TilingSprite(loader.resources[texture].texture, w, h);
		this.sprite.anchor.set(0.5);
		this.sprite.filters = [new DropShadowFilter({
			distance: 70,
			rotation: 90
		})];
		this.sprite.tint = 0.8 * 0xffffff;
		this.sprite.position.set(x, y);
		this.sprite.zIndex = 1;
		this.alwaysRender = true;
	}
	update() {
		this.sprite.rotation = this.body.angle;
	}
}