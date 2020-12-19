import App from './game/App.js';
import { Loader, utils } from 'pixi.js';
import * as WebFont from 'webfontloader';
const loader = Loader.shared;

const manifest = {
	// textures
	bark: './asset/img/textures/bark.png',
	brick: './asset/img/textures/brick.png',
	concrete: './asset/img/textures/concrete.png',
	jade: './asset/img/textures/jade.png',
	lava: './asset/img/textures/lava.png',
	marble: './asset/img/textures/marble.png',
	metal: './asset/img/textures/metal.png',
	rock: './asset/img/textures/rock.png',
	rust: './asset/img/textures/rust.png',
	sandstone: './asset/img/textures/sandstone.png',


	// sprites
	ball: './asset/img/ball.png',
	start: './asset/img/finish.png'
};

const preload = () => {
	for (const [key, value] of Object.entries(manifest)) {
		loader.add(key, value);
	}
};

const load = () => {
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
};

preload();
load();