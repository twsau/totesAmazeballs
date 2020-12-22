import { Application, Loader, TilingSprite } from 'pixi.js';
import { CRTFilter, ZoomBlurFilter } from 'pixi-filters';
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
		width: 15,
		height: 15
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
			endRound: false,
			go: {
				left: false,
				right: false
			}
		});
		inputEvents(this);
		this.camera.setTarget(this.player.body.position);
		this.stage.addChild(this.bg, this.camera, this.success);
		this.stage.filters = [
			new ZoomBlurFilter({
				center: [270, 270],
				innerRadius: 200,
				radius: 270,
				strength: -0.2
			}),
			new CRTFilter({
				curvature: 0,
				lineContrast: 0.000001,
				noise: 0.1,
				noiseSize: 1,
				vignetting: 0.41,
				vignettingAlpha: 1.1,
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
			if (this.go.left) {
				this.rotateLeft();
			}
			if (this.go.right) {
				this.rotateRight();
			}
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
	rotateLeft() {
		Composite.rotate(this.engine.world, -Math.PI / 180, {x: 100 * settings.maze.width / 2, y: 100 * settings.maze.height / 2});
	}
	rotateRight() {
		Composite.rotate(this.engine.world, Math.PI / 180, {x: 100 * settings.maze.width / 2, y: 100 * settings.maze.height / 2});
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

const inputEvents = app => {
	document.addEventListener('keydown', e => {
		if (e.key == 'ArrowLeft' || e.key.toLowerCase() == 'a') {
			if (app.endRound && app.success.y == app.screen.height / 2) {
				app.newRound();
			} else {
				app.go.left = true;
			}
		}
		if (e.key == 'ArrowRight' || e.key.toLowerCase() == 'd') {
			if (app.endRound && app.success.y == app.screen.height / 2) {
				app.newRound();
			} else {
				app.go.right = true;
			}
		}
	});
	document.addEventListener('keyup', e => {
		if  (e.key == 'ArrowLeft' || e.key.toLowerCase() == 'a') {
			app.go.left = false;
		}
		if (e.key == 'ArrowRight' || e.key.toLowerCase() == 'd') {
			app.go.right = false;
		}
	});
	const left = document.getElementById('left');
	const right = document.getElementById('right')
	left.addEventListener('pointerdown', e => {
		e.preventDefault();
		app.go.left = true;
	});
	right.addEventListener('pointerdown', e => {
		e.preventDefault();
		app.go.right = true;
	});
	left.addEventListener('pointerup', e => {
		e.preventDefault();
		app.go.left = false;
	});
	right.addEventListener('pointerup', e => {
		e.preventDefault();
		app.go.right = false;
	});
}

const isRenderable = (app, object) => {
	let distance = Math.hypot(app.player.body.position.x - object.body.position.x, app.player.body.position.y - object.body.position.y);
	return distance < settings.drawDistance;
}