const GameState = {
  inGame: false,
  turn: {
    left: false,
    right: false
  },
  atFinish: false,
  finishTimer: 0,
  pause: true,
  startTime: 0,
  level: 0,
  endTime: {
    obj: {m: 0, s: 0},
    text: null
  },
  newLevel: (startTime) => {
    GameState.level++;
    GameState.atFinish = false;
    GameState.finishTimer = 0;
    GameState.startTime = startTime;
    GameState.pause = false;
    GameState.endTime = {
      obj: {m: 0, s: 0},
      text: null
    };
  }
}

export default GameState;