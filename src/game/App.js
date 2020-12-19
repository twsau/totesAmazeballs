import { Application, Loader, TilingSprite } from 'pixi.js';
import { CRTFilter } from 'pixi-filters';
import { Composite, Engine, Events, use, World } from 'matter-js';
import 'matter-attractors';
use('matter-attractors');
import Camera from './Camera.js';
import Finish from './objects/Finish.js';
import Maze from './Maze.js';
import Platform from './objects/Platform.js';
import Wall from './sprites/Wall.js';
import Player from './Player.js';
import Scene from './Scene.js';
import Success from './Success.js';
import './App.css';
const loader = Loader.shared;

const config = {
	antialias: true,
	height: 540,
	width: 540,
	view: document.querySelector('canvas')
}

const settings = {
	drawDistance: 400,
	maze: {
		width: 10,
		height: 10
	}
}

export default class App extends Application {
	constructor() {
		super(config);
		Object.assign(this, {
			bg: new TilingSprite(loader.resources['rust'].texture, this.screen.width, this.screen.height),
			camera: new Camera(this.screen),
			engine: Engine.create(),
			maze: new Maze(settings.maze.width, settings.maze.height),
			objects: [],
			player: new Player(10, 100 * settings.maze.height - 10),
			success: new Success(this.screen),
			endRound: false
		});
		kbEvents(this);
		this.camera.setTarget(this.player.body.position);
		this.stage.addChild(this.bg, this.camera, this.success);
		this.stage.filters = [
			new CRTFilter({
				curvature: 0,
				lineContrast: 0.000001,
				noise: 0.1,
				noiseSize: 1,
				vignetting: 0.41,
				vignettingAlpha: 1,
				vignettingBlur: 1
			})
		];
		buildMap(this);
		Scene.add(this, this.player);
		handleCollision(this);
		this.ticker.add(delta => this.update(delta));
		Engine.run(this.engine);
	}
	update() {
		if (this.endRound) {
			this.success.show();
		} else {
			this.success.hide();
		}
		this.stage.filters[0].time += 0.1;
		this.stage.filters[0].seed += 0.1;
		this.camera.update();	
		this.objects.forEach(object => {
			if (!object.alwaysRender) {
				object.sprite.renderable = isRenderable(this, object);
			}
			if (object.update) {
				object.update();
			}
		});
	}
	newRound() {
		Scene.clear(this);
		this.maze = new Maze(settings.maze.width, settings.maze.height);
		buildMap(this);
		this.player.moveTo(10, 100 * settings.maze.height - 10);
		Scene.add(this, this.player);
		this.endRound = false;
	}
}

const handleCollision = app => {
	Events.on(app.engine, 'collisionStart', e => {
		e.pairs.forEach(pair => {
			const {bodyA: a, bodyB: b} = pair;
			if (b.label == 'finish' && a.label == 'player') {
				app.endRound = true;
			}
		});
	});
	Events.on(app.engine, 'collisionActive', e => {
		e.pairs.forEach(pair => {
			const {bodyA: a, bodyB: b} = pair;
		});
	});
	Events.on(app.engine, 'collisionEnd', e => {
		e.pairs.forEach(pair => {
			const {bodyA: a, bodyB: b} = pair;
			if (b.label == 'finish' && a.label == 'player') {
				app.endRound = false;
			}
		});
	});
}

const buildMap = app => {
	Scene.add(app, new Wall(100 * settings.maze.width / 2, 100 * settings.maze.height / 2, 100 * settings.maze.width, 100 * settings.maze.height, {
		texture: 'marble'
	}));
	Scene.add(app, new Platform(-25, 100 * settings.maze.height / 2 + 20, 40, 100 * settings.maze.height + 50, {
		texture: 'rock',
		alwaysRender: true
	}));
	Scene.add(app, new Platform(100 * settings.maze.width + 25, 100 * settings.maze.height / 2 + 20, 40, 100 * settings.maze.height + 50, {
		texture: 'rock',
		alwaysRender: true
	}));
	Scene.add(app, new Platform(100 * settings.maze.width / 2, 100 * settings.maze.height + 25, 100 * settings.maze.width + 10, 40, {
		texture: 'rock',
		alwaysRender: true
	}));
	Scene.add(app, new Platform(100 * settings.maze.width / 2, -25, 100 * settings.maze.width + 10 + 80, 40, {
		texture: 'rock',
		alwaysRender: true
	}));
	app.maze.cells.forEach((cell, index) => {
		let x = index % app.maze.width;
		let y = Math.floor(index / app.maze.width);
		if (!cell.N) {
			Scene.add(app, new Platform(x * 100 + 50, y * 100, 100, 20, {
				texture: 'rock',
				shadow: true
			}));
		}
		if (!cell.S) {
			Scene.add(app, new Platform(x * 100 + 50, y * 100 + 100, 100, 20, {
				texture: 'rock',
				shadow: true
			}));
		}
		if (!cell.W) {
			Scene.add(app, new Platform(x * 100, y * 100 + 50, 20, 120, {
				texture: 'rock',
				shadow: true
			}));
		}
		if (!cell.E) {
			Scene.add(app, new Platform(x * 100 + 100, y * 100 + 50, 20, 120, {
				texture: 'rock',
				shadow: true
			}));
		}
		if (cell.finish) {
			Scene.add(app, new Finish(x * 100 + 50, y * 100 + 50, 100, 100));
		}
	});
}

const kbEvents = app => {
	document.addEventListener('keydown', e => {
		if (e.key == 'ArrowLeft') {
			if (app.endRound && app.success.y == app.screen.height / 3) {
				app.newRound();
			} else {
				Composite.rotate(app.engine.world, -1 * Math.PI / 180, {x: 100 * settings.maze.width / 2, y: 100 * settings.maze.height / 2});
			}
		}
		if (e.key == 'ArrowRight') {
			if (app.endRound && app.success.y == app.screen.height / 3) {
				app.newRound();
			} else {
				Composite.rotate(app.engine.world, 1 * Math.PI / 180, {x: 100 * settings.maze.width / 2, y: 100 * settings.maze.height / 2});
			}
		}
	});
}

const isRenderable = (app, object) => {
	let distance = Math.hypot(app.player.body.position.x - object.body.position.x, app.player.body.position.y - object.body.position.y);
	return distance < settings.drawDistance;
}