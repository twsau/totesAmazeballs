import { Container, Graphics, Text } from "pixi.js";
import GameState from "../config/GameState";
import Settings from "../config/Settings";

export default class Menu extends Container {
  constructor() {
    super();
    this.views = {
      main: View.main(this),
      settings: View.settings(this),
      highscores: View.highscores(this),
      credits: View.credits(this)
    };
    let bg = new Graphics();
    bg.beginFill(0x000000).drawRect(0, 0, 640, 640).endFill();
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
      value.visible = key == view ? true : false;
    }
  }
}

const View = {
  build: (view, items) => {
    Object.entries(items).forEach(([, value], index) => {
      value.y = 150 + index * 80;
      view.addChild(value);
    });
    return view;
  },
  credits: menu => {
    let credits = new Container();
    let items = {
      author: Element.Button('twsau.co.uk', () => window.location.href = 'https://twsau.co.uk'),
      back: Element.Button('back', () => menu.display('main'))
    };
    return View.build(credits, items);
  },
  highscores: menu => {
    let highscores = new Container();
    let items = {
      x8: Element.Button('8x8 scores', () => {
        console.log('show 8x8 leaderboard');
      }),
      x12: Element.Button('12x12 scores', () => {
        console.log('show 12x12 leaderboard');
      }),
      x16: Element.Button('16x16 scores', () => {
        console.log('show 16x16 leaderboard');
      }),
      back: Element.Button('back', () => menu.display('main'))
    }
    return View.build(highscores, items);
  },
  main: menu => {
    let main = new Container();
    let items = {
      play: Element.Button('play', () => menu.display('game')),
      settings: Element.Button('settings', () => menu.display('settings')),
      highscores: Element.Button('highscores', () => menu.display('highscores')),
      credits: Element.Button('credits', () => menu.display('credits'))
    };
    return View.build(main, items);
  },
  settings: menu => {
    let settings = new Container();
    let items = {
      size: Element.Button(`size: ${Settings.maze.size}x${Settings.maze.size}`, () => {
        Settings.maze.nextSize();
        menu.views.settings.children[0].children[1].text = `size: ${Settings.maze.size}x${Settings.maze.size}`;
      }),
      timer: Element.Button(`timer: ${Settings.timer.enabled ? 'on' : 'off'}`, () => {
        Settings.timer.toggle();
        menu.views.settings.children[1].children[1].text = `timer: ${Settings.timer.enabled ? 'on' : 'off'}`;
      }),
      back: Element.Button('back', () => menu.display('main'))
    }
    return View.build(settings, items);
  }
}

const Element = {
  Border: () => {
    let border = new Graphics();
    border.lineStyle(1, 0x004444).beginFill(0x007777).drawRect(320 - 160, 0, 320, 70).endFill();
		return border;
  },
  Button: (content, callback) => {
    let button = new Container();
    button.interactive = true;
    button.buttonMode = true;
    button.on('pointerdown', e => {
      callback();
    });
    const border = Element.Border();
    const text = Element.Text(content);
    button.addChild(border, text);
    return button;
  },
  Text: content => {
    let text = new Text(content, Settings.menu.textStyle);
    text.anchor.set(0.5);
    text.position.set(320, 35);
    return text;
  }
}