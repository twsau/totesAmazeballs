import { Loader, Sprite } from 'pixi.js';
import { DropShadowFilter } from 'pixi-filters';
import { Bodies, Body } from 'matter-js';
const loader = Loader.shared;

export default class Player {
	constructor(x, y) {
		Object.assign(this, {
			body: Bodies.circle(x, y, 33, {
				density: 0.001,
				label: 'player',
				restitution: 0.6
			}),
			go: {
				up: false,
				down: false,
				left: false,
				right: false
			},
			sprite: new Sprite(loader.resources['ball'].texture)
		});
		this.sprite.anchor.set(0.5);
		this.sprite.filters = [new DropShadowFilter()];
		this.sprite.scale.set(0.66)
		this.sprite.zIndex = 2;
	}
	update() {
		this.sprite.position.set(this.body.position.x, this.body.position.y);
		this.sprite.rotation = this.body.angle;
	}
	moveTo(x, y) {
		Body.setPosition(this.body, {
			x: x,
			y: y
		});
	}
}