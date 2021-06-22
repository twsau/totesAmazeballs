const GameState = {
  turn: {
    left: false,
    right: false
  },
  atFinish: false,
  finishTimer: 0,
  pause: true,
  startTime: 0,
  level: 0,
  newLevel: (startTime) => {
    GameState.level++;
    GameState.atFinish = false;
    GameState.finishTimer = 0;
    GameState.startTime = startTime;
    GameState.pause = false;
  }
}

export default GameState;