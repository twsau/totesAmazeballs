import Settings from './Settings';

export default class Maze {
  constructor() {
    this.size = Settings.maze.size;
    this.cells = new Array(this.size ** 2);
    this.dirs = ['n', 'e', 's', 'w'];
    this.mod = {
			'n': { y: -1, x: 0, o: 's'},
			'e': { y: 0, x: 1, o: 'w'},
			's': {y: 1, x: 0, o: 'n'},
			'w': {y: 0, x: -1, o: 'e'}
		};
    for (let i = 0; i < this.cells.length; i++) {
      this.cells[i] = new Cell();
    }
    this.build(Settings.maze.size - 1, 0);
    let finish = this.getCell(this.size - 1, 0);
    finish.flags.push('finish');
  }
  build(x, y) {
    this.explore(x, y);
    this.cells.forEach(cell => {
      cell.cleanUp();
    })
    delete this.dirs;
    delete this.mod;
  }
  explore(x, y) {
    let dirs = shuffle(this.dirs);
    let cell = this.getCell(x, y);
    cell.visited = true;
    dirs.forEach(dir => {
      let nx = x + this.mod[dir].x;
      let ny = y + this.mod[dir].y;
      if (nx >= 0 && nx < this.size && ny >= 0 && ny < this.size && this.getCell(nx, ny).visited == false) {
				cell[dir] = true;
				let nextCell = this.getCell(nx, ny);
				nextCell[this.mod[dir].o] = true;
				this.explore(nx, ny);
			}
    });
  }
  getCell(x, y) {
    return this.cells[y * this.size + x];
  }
}

class Cell {
  constructor() {
    this.n = false;
    this.e = false;
    this.s = false;
    this.w = false;
    this.visited = false;
    this.flags = [];
  }
  cleanUp() {
    delete this.visited;
    delete this.s;
    delete this.w;
  }
}

function intBetween(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function shuffle(array) {
  let output = [...array];
  for (let i = output.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [output[i], output[j]] = [output[j], output[i]];
  }
  return output;
}

function randomFromArray(array) {
  return array[Math.floor(Math.random() * array.length)];
}