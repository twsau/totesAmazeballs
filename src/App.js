import { Application } from 'pixi.js';
import { Composite, Engine, Runner } from 'matter-js';
import Camera from './object/Camera';
import Player from './object/Player';
import Scene from './function/Scene';
import Maze from './object/Maze';
import Settings from './config/Settings';
import GameState from './config/GameState';
import Filters from './config/Filters';
import HandleCollision from './function/HandleCollision';
import HandleInput from './function/HandleInput';
import RenderMaze from './function/RenderMaze';
import Timer from './object/Timer';

export default class App extends Application {
  constructor() {
    super({antialias: true, backgroundColor: 0x161925, height: 640, width: 640, view: document.querySelector('canvas')});
    this.objects = [];
    this.engine = Engine.create();
    HandleInput();
    HandleCollision(this);
    this.stage.filters = Filters.stage(this.screen);
    this.camera = new Camera(this.screen);
    this.camera.filters = Filters.camera();
    this.newLevel();
    this.ticker.add(delta => this.update(delta));
    Runner.run(this.engine);
  }
  newLevel() {
    GameState.newLevel(this.ticker.lastTime);
    if (GameState.level > 1) {
      Scene.clear(this);
    }
    this.player = new Player();
    this.camera.setTarget(this.player.body.position);
    this.maze = new Maze();
    this.timer = new Timer(this.screen);
    RenderMaze(this);
    Scene.add(this, this.player);
    this.stage.addChild(this.camera, this.timer);
  }
  rotateLeft() {
    Composite.rotate(this.engine.world, -Math.PI / 180, {x: 100 * Settings.maze.size / 2, y: 100 * Settings.maze.size / 2});
  }
  rotateRight() {
    Composite.rotate(this.engine.world, Math.PI / 180, {x: 100 * Settings.maze.size / 2, y: 100 * Settings.maze.size / 2});
  }
  update(delta) {
    this.timer.update(this.ticker.lastTime);
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