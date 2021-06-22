const Settings = {
  drawDistance: 400,
  maze: {
    cellSize: 128,
    size: 8,
    nextSize: () => {
      switch(Settings.maze.size) {
        case 8:
          Settings.maze.size = 12;
          break;
        case 12:
          Settings.maze.size = 16;
          break;
        case 16:
          Settings.maze.size = 8;
          break;
        }
      window.localStorage.setItem('size', Settings.maze.size);
    },
  },
  menu: {
    textStyle: {
      fill: 0x00ffff,
      fontFamily: 'Press Start 2P',
      fontSize: 22
    }
  },
  timer: {
    enabled: true,
    textStyle: {
      fill: 0x00ffff,
      fontFamily: 'Press Start 2P',
      fontSize: 52
    },
    toggle: () => {
      Settings.timer.enabled = !Settings.timer.enabled;
      window.localStorage.setItem('timer', Settings.timer.enabled);
    }
  },
  load: () => {
    let timer = window.localStorage.getItem('timer') == 'true' ? true : false;
    timer = timer == null ? true : timer;
    Settings.timer.enabled = timer;
    let size = window.localStorage.getItem('size');
    size = size == null ? 8 : parseInt(size);
    Settings.maze.size = size;
  }
}

export default Settings;