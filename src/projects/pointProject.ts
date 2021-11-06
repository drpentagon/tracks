import GraphicsHandler from "../graphicsHandler.js";
import Project from "../projects/project.js";
import Point from "../primitives/point.js";
import PhysicsHandler from "../physicsHandler.js";

export default class PointProject implements Project {
  title: string = "POINT PROJECT BASE";
  backgroundColor: string = "#FFF";
  color: string = "#000";
  gh: GraphicsHandler;
  ph: PhysicsHandler;
  now: number;
  then: number;
  points: Point[];

  constructor(gh: GraphicsHandler) {
    this.gh = gh;
    this.ph = new PhysicsHandler(gh.parent);
    this.points = [];
    window.addEventListener("resize", () =>
      this.ph.setCanvasSize(this.gh.parent)
    );
    this.setupClickEvents();
  }

  setupClickEvents() {
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

  addPoint(x: number, y: number) {
    this.points.push(new Point(x, y));
  }

  gameLoop() {
    this.now = Date.now();
    this.gh.clear();

    if (this.then != null) {
      let delta = (this.now - this.then) / 1000;
      this.gameLoopLogic();

      this.points.forEach((p) => {
        p.update(delta);
        p.render(this.gh);
      });
    }
    this.then = this.now;
    requestAnimationFrame(() => this.gameLoop());
  }

  gameLoopLogic() {}
}
