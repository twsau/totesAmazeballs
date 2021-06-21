import Scene from './Scene';
import Background from '../object/Background';
import Wall from '../object/Wall';
import Settings from '../config/Settings';
import Finish from '../object/Finish';

export default function RenderMaze(app) {
  Scene.add(app, new Background());
    const d = Settings.maze.size * Settings.maze.cellSize;
    const r = d / 2;
    const w = 400;
    const wr = w / 2;
    Scene.add(app, new Wall(r, d + wr, d + w, w, {
      alwaysRender: true
    }));
    Scene.add(app, new Wall(d + wr, r, w, d + w, {
      alwaysRender: true
    }));
    Scene.add(app, new Wall(r, -wr, d + w, w, {
      alwaysRender: true
    }));
    Scene.add(app, new Wall(-wr, r, w, d + w, {
      alwaysRender: true
    }));
    app.maze.cells.forEach((cell, index) => {
      let x = index % Settings.maze.size;
      let y = Math.floor(index / Settings.maze.size);
      let cz = Settings.maze.cellSize;
      let r = cz / 2;
      if (!cell.n) {
        Scene.add(app, new Wall(x * cz + r, y * cz, cz, 20));
      }
      if (!cell.e) {
        Scene.add(app, new Wall(x * cz + cz, y * cz + r, 20, cz + 20));
      }
      if (cell.flags.includes('finish')) {
        Scene.add(app, new Finish(x * cz + r, y * cz + r));
      }
    });
}