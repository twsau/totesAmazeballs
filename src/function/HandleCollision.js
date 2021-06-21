import { Events } from "matter-js";
import GameState from "../config/GameState";

export default function HandleCollision(app) {
  Events.on(app.engine, 'collisionStart', e => {
    e.pairs.forEach(pair => {
      const { bodyA: a, bodyB: b} = pair;
      if (b.label == 'finish' && a.label == 'player') {
        GameState.atFinish = true;
      }
    });
  });
  Events.on(app.engine, 'collisionEnd', e => {
    e.pairs.forEach(pair => {
      const { bodyA: a, bodyB: b} = pair;
      if (b.label == 'finish' && a.label == 'player') {
        GameState.atFinish = false;
      }
    })
  });
}