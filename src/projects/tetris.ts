import GraphicsHandler from "../graphicsHandler";
import Project from "./project";

export default class Tetris implements Project {
  backgroundColor: string = "#FDD";
  color: string = "#600";
  title: string = "Tetris";
  gh: GraphicsHandler;
  now: number;
  then: number;

  constructor(gh: GraphicsHandler) {
    this.gh = gh;
  }

  gameLoop() {
    this.now = Date.now();

    if (this.then != null) {
      let delta = (this.now - this.then) / 1000;
    }

    this.then = this.now;

    requestAnimationFrame(() => this.gameLoop());
  }
}
