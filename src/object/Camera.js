import { Container } from "pixi.js";

const panSpeed = 0.1;

export default class Camera extends Container {
  constructor(bounds) {
    super();
    this.bounds = bounds;
    this.sortableChildren = true;
  }
  setTarget(target) {
    this.target = target;
  }
  update() {
    if (!!this.target) {
      this.x = -this.target.x + this.bounds.width / 2;
      this.y = -this.target.y + this.bounds.height / 2;
    }
  }
}