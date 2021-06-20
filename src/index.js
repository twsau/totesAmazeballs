import './style.scss';
import App from './App.js';
import { Loader, utils } from 'pixi.js';
import * as WebFont from 'webfontloader';
const loader = Loader.shared;

const assetManifest = {
  ball: './asset/img/ball.png',
  finish: './asset/img/finish.png',
  rock: './asset/img/rock.png',
  marble: './asset/img/marble.png'
};

function preloadAssets() {
  for (const [key, value] of Object.entries(assetManifest)) {
    loader.add(key, value);
  }
}

function launchApp() {
  loader.load(() => {
    WebFont.load({
      google: {
        families: [
          'Press Start 2P'
        ]
      },
      active: e => {
        utils.skipHello();
        const app = new App();
      }
    })
  })
}

preloadAssets();
launchApp();