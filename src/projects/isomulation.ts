import GraphicsHandler from "../graphicsHandler";
import Project from "./project";
import Point from "../primitives/point.js";
import LineSegment from "../primitives/lineSegment.js";
import { getLineOffset } from "../mathHelper.js";

export default class Isomulation implements Project {
  backgroundColor: string = "#FFFF";
  color: string = "#600";
  title: string = "ISOMULATION";
  gh: GraphicsHandler;
  now: number;
  then: number;

  grid: LineSegment[][];

  constructor(gh: GraphicsHandler) {
    this.gh = gh;

    this.grid = [];
    for (let d = 0; d < 3; d++) {
      const a: number = -Math.PI / 6 + (d * Math.PI) / 3;
      const lines: LineSegment[] = [];
      const center: LineSegment = new LineSegment(
        new Point(this.gh.width / 2, this.gh.height / 2),
        Math.tan(a) > 1000000
          ? new Point(this.gh.width / 2, this.gh.height / 2 - 100)
          : new Point(
              this.gh.width / 2 + 100,
              this.gh.height / 2 + Math.tan(a) * 100
            )
      );
      for (let i = -70; i < 70; i++) {
        lines.push(getLineOffset(center, i * 25));
      }

      this.grid.push(lines);
    }
  }

  gameLoop() {
    this.gh.clear();
    this.grid.forEach((d) => d.forEach((l) => l.renderInfinit(this.gh)));
    requestAnimationFrame(() => this.gameLoop());
  }
}
