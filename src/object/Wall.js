import { Bodies } from "matter-js";
import { Loader, TilingSprite } from "pixi.js";

export default class Wall {
  constructor(x, y, w, h, kwargs = {alwaysRender: false}) {
    const { alwaysRender } = kwargs;
    this.body = Bodies.rectangle(x, y, w, h, { isStatic: true });
    this.sprite = new TilingSprite(Loader.shared.resources['rock'].texture, w, h);
    this.sprite.anchor.set(0.5);
    this.sprite.position.set(this.body.position.x, this.body.position.y);
    this.alwaysRender = alwaysRender;
    this.sprite.zIndex = 3;
  }
  update() {
    const { x, y } = this.body.position;
    this.sprite.position.set(x, y);
    this.sprite.rotation = this.body.angle;
  }
}