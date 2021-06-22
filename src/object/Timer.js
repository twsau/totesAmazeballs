import { Text } from "pixi.js";
import GameState from "../config/GameState";
import Settings from "../config/Settings";

export default class Timer extends Text {
  constructor(screen) {
    super('00:00', Settings.timer.textStyle);
    this.anchor.set(0.5, 1);
    this.position.set(screen.width / 2, screen.height - 50);
    this.alwaysRender = true;
    this.alpha = 0.2;
  }
  update(currentTime) {
    const time = currentTime - GameState.startTime;
    let s = Math.floor(time / 1000) % 60;
    let m = Math.floor(time / 1000 / 60);
    if (m < 10) {
      m = `0${m}`;
    }
    if (s < 10) {
      s = `0${s}`;
    }
    this.text = `${m}:${s}`;
  }
}