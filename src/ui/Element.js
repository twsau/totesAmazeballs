import { Container, Graphics, Text } from "pixi.js";
import Settings from '../config/Settings';

const Element = {
  Bg: () => {
    let bg = new Graphics();
    bg.beginFill(0x000000).drawRect(0, 0, 640, 640).endFill();
    return bg;
  },
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
  Label: content => {
    let label = new Container();
    const text = Element.Text(content);
    label.addChild(text);
    return label;
  },
  Text: content => {
    let text = new Text(content, Settings.menu.textStyle);
    text.anchor.set(0.5);
    text.position.set(320, 35);
    return text;
  }
}

export default Element;