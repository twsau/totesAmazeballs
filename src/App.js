import { Application } from 'pixi.js';
import { Composite, Engine, Runner } from 'matter-js';
import Camera from './component/Camera';
import Player from './component/Player';
import Scene from './component/Scene';
import HandleInput from './component/HandleInput';
import Maze from './component/Maze';
import Settings from './component/Settings';
import Wall from './component/Wall';
import GameState from './component/GameState';
import Background from './component/Background';
import { BulgePinchFilter, CRTFilter } from 'pixi-filters';
import Finish from './component/Finish';
import HandleCollision from './component/HandleCollision';

export default class App extends Application {
  constructor() {
    super({antialias: true, backgroundColor: 0x161925, height: 640, width: 640, view: document.querySelector('canvas')});
    this.objects = [];
    this.engine = Engine.create();
    HandleInput();
    HandleCollision(this);
    this.stage.filters = [
      new BulgePinchFilter({
        radius: this.screen.width / 2,
        strength: 0.314
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
    this.newLevel();
    this.ticker.add(delta => this.update(delta));
    Runner.run(this.engine);
  }
  newLevel() {
    GameState.level++;
    GameState.atFinish = false;
    GameState.finishTimer = 0;
    if (GameState.level > 1) {
      Scene.clear(this);
    }
    this.player = new Player(Settings.maze.cellSize / 2, Settings.maze.cellSize / 2 + Settings.maze.size * Settings.maze.cellSize - 1);
    this.camera = new Camera(this.screen, this.player.body.position);
    this.maze = new Maze();
    this.renderMaze();
    Scene.add(this, this.player);
    this.stage.addChild(this.camera);
  }
  renderMaze() {
    Scene.add(this, new Background());
    const d = Settings.maze.size * Settings.maze.cellSize;
    const r = d / 2;
    const w = 400;
    const wr = w / 2;
    Scene.add(this, new Wall(r, d + wr, d + w, w, {
      alwaysRender: true
    }));
    Scene.add(this, new Wall(d + wr, r, w, d + w, {
      alwaysRender: true
    }));
    Scene.add(this, new Wall(r, -wr, d + w, w, {
      alwaysRender: true
    }));
    Scene.add(this, new Wall(-wr, r, w, d + w, {
      alwaysRender: true
    }));
    this.maze.cells.forEach((cell, index) => {
      let x = index % Settings.maze.size;
      let y = Math.floor(index / Settings.maze.size);
      let cz = Settings.maze.cellSize;
      let r = cz / 2;
      if (!cell.n) {
        Scene.add(this, new Wall(x * cz + r, y * cz, cz, 20));
      }
      if (!cell.e) {
        Scene.add(this, new Wall(x * cz + cz, y * cz + r, 20, cz + 20));
      }
      if (cell.flags.includes('finish')) {
        Scene.add(this, new Finish(x * cz + r, y * cz + r));
      }
    });
  }
  rotateLeft() {
    Composite.rotate(this.engine.world, -Math.PI / 180, {x: 100 * Settings.maze.size / 2, y: 100 * Settings.maze.size / 2});
  }
  rotateRight() {
    Composite.rotate(this.engine.world, Math.PI / 180, {x: 100 * Settings.maze.size / 2, y: 100 * Settings.maze.size / 2});
  }
  update() {
    if (GameState.turn.left) {
      this.rotateLeft();
    }
    if (GameState.turn.right) {
      this.rotateRight();
    }
    this.camera.update();
    this.objects.forEach(object => {
      if (object.update) {
        object.update();
      }
      if (!object.alwaysRender) {
        object.sprite.renderable = isRenderable(this.player.body.position, object);
      }
    });
    if (GameState.atFinish) {
      if (GameState.finishTimer < 100) {
        GameState.finishTimer++;
      } else {
        this.newLevel();
      }
    }
  }
}

function isRenderable(ref, object) {
  let distance = Math.hypot(ref.x - object.body.position.x, ref.y - object.body.position.y);
	return distance < Settings.drawDistance;
}