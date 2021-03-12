import GraphicsHandler from "./graphicsHandler.js";
import Primitive from "./primitives/primitive.js";
import Point from "./primitives/point.js";
import Line from "./primitives/line.js";
import { getLinesIntersection } from "./mathHelper.js";

const CONTAINER: HTMLElement = document.querySelector(".graphics-wrapper");

class Application {
  gh: GraphicsHandler;
  constructor() {
    console.log("Applicaation initialized 2");
    this.gh = new GraphicsHandler(CONTAINER);
  }

  start() {
    const l1: Line = new Line(new Point(100, 100), new Point(300, 400));
    const l2: Line = new Line(new Point(800, 200), new Point(500, 500));
    const objects: Primitive[] = [
      l1,
      l2,
      l1.p1,
      l1.p2,
      l2.p1,
      l2.p2,
      getLinesIntersection(l1, l2),
    ];

    objects.forEach((p) => p.render(this.gh));
  }
}

const tracks: Application = new Application();
tracks.start();
