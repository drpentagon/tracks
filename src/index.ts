import GraphicsHandler from "./graphicsHandler.js";
import Primitive from "./primitives/primitive.js";
import Point from "./primitives/point.js";
import Line from "./primitives/line.js";
import { getLinesIntersection } from "./mathHelper.js";

const CONTAINER: HTMLElement = document.querySelector(".graphics-wrapper");

class Application {
  gh: GraphicsHandler;
  now: number;
  then: number;
  objects: Primitive[];
  p: Point;
  l1: Line;
  l2: Line;

  constructor() {
    console.log("Applicaation initialized 2");
    this.gh = new GraphicsHandler(CONTAINER);
  }

  start() {
    this.p = new Point(800, 200);
    this.l1 = new Line(new Point(100, 100), new Point(300, 400));
    this.l2 = new Line(this.p, new Point(300, 500));
    this.objects = [
      this.l1,
      this.l2,
      this.l1.p1,
      this.l1.p2,
      this.l2.p1,
      this.l2.p2,
    ];

    this.gameLoop();
  }

  gameLoop() {
    this.now = Date.now();

    if (this.then != null) {
      let delta = (this.now - this.then) / 1000;
      this.p.y += delta * 80;
      this.l2.updateLineEquation();
      // Data.instance.update(delta);
    }

    this.then = this.now;

    const intersection: Point = getLinesIntersection(this.l1, this.l2);

    this.gh.clear();
    this.objects.forEach((p) => p.render(this.gh));
    intersection.render(this.gh);

    requestAnimationFrame(() => this.gameLoop());
  }
}

const tracks: Application = new Application();
tracks.start();
