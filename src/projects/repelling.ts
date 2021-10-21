import GraphicsHandler from "../graphicsHandler";
import Project from "./project";
import Point from "../primitives/point.js";

export default class Repelling implements Project {
  gh: GraphicsHandler;
  now: number;
  then: number;
  canvasWidth: number;
  canvasHeight: number;
  points: Point[];
  p: Point;

  constructor(gh: GraphicsHandler) {
    this.gh = gh;
    this.points = [];
    this.setCanvasSize();
    window.addEventListener("resize", () => this.setCanvasSize());
    if ("ontouchstart" in window) {
      window.addEventListener("touchstart", (e) =>
        this.addPoint(e.touches[0].clientX, e.touches[0].clientY)
      );
    } else {
      window.addEventListener("click", (e) =>
        this.addPoint(e.clientX, e.clientY)
      );
    }
  }

  setCanvasSize() {
    this.canvasWidth = this.gh.parent.offsetWidth;
    this.canvasHeight = this.gh.parent.offsetHeight;
  }

  addPoint(x: number, y: number) {
    this.points.push(new Point(x, y));
  }

  gameLoop() {
    this.now = Date.now();
    this.gh.clear();

    if (this.then != null) {
      let delta = (this.now - this.then) / 1000;
      this.points.forEach((p) => {
        this.addWallForces(p);
        this.addAntiGravity(p);
        this.addFriction(p);
      });

      this.points.forEach((p) => {
        p.update(delta);
        p.render(this.gh);
      });
    }
    this.then = this.now;
    requestAnimationFrame(() => this.gameLoop());
  }

  addWallForces(point: Point) {
    const FORCE = 5000;
    point.dx += FORCE / point.x + FORCE / (point.x - this.canvasWidth);
    point.dy += FORCE / point.y + FORCE / (point.y - this.canvasHeight);
  }

  addFriction(point: Point) {
    point.dx *= 0.99;
    point.dy *= 0.99;
  }

  addAntiGravity(point: Point) {
    const FORCE = 200;
    this.points.forEach((p) => {
      if (p !== point) {
        const dx: number = point.x - p.x;
        const dy: number = point.y - p.y;
        const f = FORCE / Math.sqrt(dx * dx + dy * dy);
        point.dx += (f * dx) / (Math.abs(dx) + Math.abs(dy));
        point.dy += (f * dy) / (Math.abs(dx) + Math.abs(dy));
      }
    });
  }
}
