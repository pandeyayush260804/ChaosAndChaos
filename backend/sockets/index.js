// sockets/index.js
import matchmaking from "./matchmaking.js";
import questions from "./questions.js";
import battle from "./battle.js";
import judge from "./judge.js";

export default function socketManager(io) {
  matchmaking(io);
  questions(io);
  battle(io);
  judge(io);
}
