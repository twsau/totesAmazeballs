import { Container } from "pixi.js";
import Element from './Element';
import Settings from "../config/Settings";
import GameState from "../config/GameState";

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
  controls: menu => {
    let controls = new Container();
    let items = {
      desktop: Element.Label('desktop: arrow keys'),
      mobile: Element.Label('mobile: on-screen buttons'),
      back: Element.Button('back', () => menu.display('main'))
    }
    return View.build(controls, items);
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
    };
    return View.build(highscores, items);
  },
  main: menu => {
    let main = new Container();
    let items = {
      play: Element.Button('play', () => menu.display('game')),
      settings: Element.Button('settings', () => menu.display('settings')),
      //highscores: Element.Button('highscores', () => menu.display('highscores')),
      controls: Element.Button('controls', () => menu.display('controls')),
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
    };
    return View.build(settings, items);
  },
  victory: menu => {
    let victory = new Container();
    let items = {
      title: Element.Label('Congratulations!'),
      stats: Element.Label(`your time: ${GameState.endTime.text}`),
      //highscores: Element.Button('highscores', () => menu.display('highscores')),
      play: Element.Button('play again', () => menu.display('game'))
    };
    victory.update = () => {
      victory.children[1].children[0].text = `your time: ${GameState.endTime.text}`;
    }
    return View.build(victory, items);
  }
}

export default View;