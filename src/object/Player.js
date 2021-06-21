import { Bodies } from "matter-js";
import { Loader, Sprite } from "pixi.js";
import Settings from '../config/Settings';

export default class Player {
  constructor() {
    const x = Settings.maze.cellSize / 2;
    const y = Settings.maze.cellSize / 2 + Settings.maze.size * Settings.maze.cellSize - 1;
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