import GraphicsHandler from "../graphicsHandler";
import Project from "./project";
import Point from "../primitives/point.js";

export default class Tetris implements Project {
  backgroundColor: string = "#FDD";
  color: string = "#600";
  title: string = "Squared";
  gh: GraphicsHandler;
  now: number;
  then: number;
  points: Point[];

  constructor(gh: GraphicsHandler) {
    this.gh = gh;
    this.points = [];
    this.points.push(new Point(100, 200));
  }

  gameLoop() {
    this.now = Date.now();

    if (this.then != null) {
      let delta = (this.now - this.then) / 1000;
      this.points.forEach((p) => {
        p.update(delta);
        p.render(this.gh);
      });
    }

    this.then = this.now;

    requestAnimationFrame(() => this.gameLoop());
  }
}
