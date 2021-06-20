import { Bodies } from "matter-js";
import { Loader, Sprite } from "pixi.js";

export default class Player {
  constructor(x, y) {
    this.body = Bodies.circle(x, y, 45, { density: 0.001, label: 'player', restitution: 0.4 });
    this.sprite = new Sprite(Loader.shared.resources['ball'].texture);
    this.sprite.anchor.set(0.5);
    this.sprite.scale.set(0.9);
    this.sprite.zIndex = 3;
  }
  update() {
    const { x, y } = this.body.position;
    this.sprite.position.set(x, y);
    this.sprite.rotation = this.body.angle;
  }
}