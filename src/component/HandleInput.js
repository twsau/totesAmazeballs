import GameState from './GameState';

function handleKeyboardInput() {
  document.addEventListener('keydown', e => {
    if (e.key == 'ArrowLeft' || e.key.toLowerCase() == 'a') {
      GameState.turn.left = true;
    }
    if (e.key == 'ArrowRight' || e.key.toLowerCase() == 'd') {
      GameState.turn.right = true;
    }
  });
  document.addEventListener('keyup', e => {
    if (e.key == 'ArrowLeft' || e.key.toLowerCase() == 'a') {
      GameState.turn.left = false;
    }
    if (e.key == 'ArrowRight' || e.key.toLowerCase() == 'd') {
      GameState.turn.right = false;
    }
  });
  document.getElementById('left').addEventListener('pointerdown', e => {
    GameState.turn.left = true;
    e.target.classList = ['active'];
  });
  document.getElementById('left').addEventListener('pointerup', e => {
    GameState.turn.left = false;
    e.target.classList = [];
  });
  document.getElementById('left').addEventListener('pointerleave', e => {
    GameState.turn.left = false;
    e.target.classList = [];
  });
  document.getElementById('right').addEventListener('pointerdown', e => {
    GameState.turn.right = true;
    e.target.classList = ['active'];
  });
  document.getElementById('right').addEventListener('pointerup', e => {
    GameState.turn.right = false;
    e.target.classList = [];
  });
  document.getElementById('right').addEventListener('pointerleave', e => {
    GameState.turn.right = false;
    e.target.classList = [];
  });
}

function HandleInput() {
  handleKeyboardInput();
}

export default HandleInput;