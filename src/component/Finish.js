import { Bodies } from "matter-js";
import { Loader, TilingSprite } from "pixi.js";
import Settings from "./Settings";

export default class Finish {
  constructor(x, y) {
    const s = Settings.maze.cellSize;
    this.body = Bodies.rectangle(x, y, s, s, {
      isSensor: true,
      isStatic: true,
      label: 'finish'
    });
    this.sprite = new TilingSprite(Loader.shared.resources['finish'].texture, s, s);
    this.sprite.anchor.set(0.5);
    this.sprite.zIndex = 2;
  }
  update() {
    const { x, y } = this.body.position;
    this.sprite.position.set(x, y);
    this.sprite.rotation = this.body.angle;
  }
}