import { Container, Graphics } from "pixi.js";
import GameState from "../config/GameState";
import Element from "../ui/Element";
import View from '../ui/View';

export default class Menu extends Container {
  constructor() {
    super();
    this.views = {
      main: View.main(this),
      settings: View.settings(this),
      highscores: View.highscores(this),
      controls: View.controls(this),
      credits: View.credits(this),
      victory: View.victory(this)
    };
    let bg = Element.Bg();
    this.addChild(bg);
    for (const view in this.views) {
      this.addChild(this.views[view]);
    }
    this.display('main');
  }
  display(view) {
    if (view == 'game') {
      this.visible = false;
      GameState.pause = false;
    }
    for (const [key, value] of Object.entries(this.views)) {
      if (key == view) {
        if (value.update) {
          value.update();
        }
        value.visible = true;
      } else {
        value.visible = false;
      }
    }
  }
}