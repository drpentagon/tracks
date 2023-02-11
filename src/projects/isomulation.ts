import GraphicsHandler from "../graphicsHandler";
import Project from "./project";
import Point from "../primitives/point.js";

export default class Isomulation implements Project {
  backgroundColor: string = "#DDF";
  color: string = "#600";
  title: string = "ISOMULATION";
  gh: GraphicsHandler;
  now: number;
  then: number;

  p: Point;

  constructor(gh: GraphicsHandler) {
    this.gh = gh;
    this.p = new Point(this.gh.width / 2, this.gh.height / 2);
  }

  gameLoop() {
    this.p.render(this.gh);
  }
}
