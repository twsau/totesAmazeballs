import { Container } from 'pixi.js';

export default class Camera extends Container {
	constructor(bounds) {
		super();
		Object.assign(this, {
			bounds: bounds,
			sortableChildren: true,
			target: null
		});
	}
	update() {
		if (!!this.target) {
			const coordinates = {
				x: (-this.target.x + this.bounds.width / 2) + (1 - this.scale.x) * this.bounds.width / 2.5,
				y: (-this.target.y + this.bounds.height / 2) + (1 - this.scale.y) * this.bounds.height / 1.33
			};
			this.position.set(coordinates.x, coordinates.y);
		}
	}
	setTarget(target) {
		this.target = target;
	}
}