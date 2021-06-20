import { Bodies } from "matter-js";
import { Loader, TilingSprite } from "pixi.js";
import Settings from "./Settings";

export default class Background {
  constructor() {
    const s = (Settings.maze.size * Settings.maze.cellSize) / 2;
    const d = Settings.maze.size * Settings.maze.cellSize;
    this.body = Bodies.rectangle(s, s, d, d, {
      isSensor: true,
      isStatic: true
    });
    this.sprite = new TilingSprite(Loader.shared.resources['marble'].texture, Settings.maze.size * Settings.maze.cellSize, Settings.maze.size * Settings.maze.cellSize);
    this.sprite.anchor.set(0.5);
    this.alwaysRender = true;
    this.sprite.zIndex = 1;
  }
  update() {
    const { x, y } = this.body.position;
    this.sprite.position.set(x, y);
    this.sprite.rotation = this.body.angle;
  }
}