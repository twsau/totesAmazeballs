import { Loader, Sprite } from 'pixi.js';
import { Bodies, Body } from 'matter-js';
const loader = Loader.shared;

let force = {
	x: 0,
	y: 0
};

export default class Cannonball {
	constructor(x, y, kwargs) {
		if (kwargs) {
			force = kwargs.force ? kwargs.force : {x: 0, y: 0};
		}
		Object.assign(this, {
			body: Bodies.circle(x, y, 15, {
				isStatic: false,
				label: 'Cannonball',
				density: 0.01
			}),
			sprite: new Sprite(loader.resources['cannonball'].texture)
		});
		this.sprite.anchor.set(0.5);
		this.sprite.position.set(this.body.position.x, this.body.position.y);
		this.sprite.zIndex = 2;
		Body.applyForce(this.body, this.body.position, force);
	}
	update() {
		this.sprite.position.set(this.body.position.x, this.body.position.y);
		this.sprite.rotation = this.body.angle;
	}
}