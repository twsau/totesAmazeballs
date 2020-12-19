import { Loader, TilingSprite } from 'pixi.js';
import { DropShadowFilter } from 'pixi-filters';
import { Bodies, Body } from 'matter-js';
const loader = Loader.shared;

// default kwargs
let angle = 0;
let alwaysRender = false;
let isStatic = true;
let texture = 'sandstone';
let shadow = false;

export default class Platform {
	constructor(x, y, w, h, kwargs) {
		if (kwargs) {
			angle = kwargs.angle ? kwargs.angle : 0;
			isStatic = typeof kwargs.isStatic !== 'undefined' ? kwargs.isStatic : true;
			texture = kwargs.texture ? kwargs.texture : 'sandstone';
			shadow = kwargs.shadow ? kwargs.shadow : false;
			alwaysRender = kwargs.alwaysRender ? kwargs.alwaysRender : false;
		}
		Object.assign(this, {
			body: Bodies.rectangle(x, y, w, h, {
				isStatic: isStatic,
				label: `platform ${texture}`
			}),
			sprite: new TilingSprite(loader.resources[texture].texture, w, h)
		})
		Body.rotate(this.body, angle * Math.PI / 180);
		this.sprite.anchor.set(0.5);
		if (shadow) {
			this.sprite.filters = [new DropShadowFilter({
				distance: 5,
				rotation: 90,
				quality: 0.1
			})];
		}
		this.alwaysRender = alwaysRender;
		this.sprite.position.set(this.body.position.x, this.body.position.y);
		this.sprite.zIndex = 5;
	}
	update() {
		this.sprite.position.set(this.body.position.x, this.body.position.y);
		this.sprite.rotation = this.body.angle;
	}
}