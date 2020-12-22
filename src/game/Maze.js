export default class Maze {
	constructor(width, height) {
		this.height = isNaN(height) ? 5 : height < 5 ? 5 : height > 100 ? 100 : height;
		this.width = isNaN(width) ? 5 : width < 5 ? 5 : width > 100 ? 100 : width;
		this.cells = new Array(this.width * this.height);
		for (let i = 0; i < this.cells.length; i++) {
			this.cells[i] = new Cell();
		}
		this.dirs = ['N', 'E', 'S', 'W'];
		this.modDir = {
			'N': { y: -1, x: 0, o: 'S'},
			'E': { y: 0, x: 1, o: 'W'},
			'S': {y: 1, x: 0, o: 'N'},
			'W': {y: 0, x: -1, o: 'E'}
		};
		this.build(0, this.height - 1);
	}
	build(x, y) {
		this.explore(x, y);
		this.cells.forEach(cell => {
			cell.purge();
		});
		this.getCell(this.width - 1, 0).finish = true;
		delete this.dirs;
		delete this.modDir;
	}
	explore(ex, ey) {
		this.dirs = shuffle(this.dirs);
		let cell = this.getCell(ex, ey);
		cell.visited = true;
		this.dirs.forEach(d => {
			let nx = ex + this.modDir[d].x;
			let ny = ey + this.modDir[d].y;
			if (nx >= 0 && nx < this.width && ny >= 0 && ny < this.height && this.getCell(nx, ny).visited == false) {
				cell[d] = true;
				let nextCell = this.getCell(nx, ny);
				nextCell[this.modDir[d].o] = true;
				this.explore(nx, ny);
			}
		});
	}
	getCell(x, y) {
		return this.cells[y * this.width + x];
	}
}

class Cell {
	constructor() {
		Object.assign(this, {
			N: false,
			E: false,
			S: false,
			W: false,
			visited: false,
			start: false,
			finish: false
		});
	}
	purge() {
		delete this.visited;
	}
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}