import ComposedObject from "./composedObject";
import GraphicsHandler from "../graphicsHandler";
import LineSegment from "../primitives/lineSegment.js";
import Point from "../primitives/point.js";
import { getLineOffset } from "../mathHelper.js";

export default class IsoGrid implements ComposedObject {
  spacing: number;
  grid: LineSegment[][];

  constructor(spacing: number, gh: GraphicsHandler) {
    this.spacing = spacing;
    this.grid = [];
    for (let d = 0; d < 3; d++) {
      const a: number = -Math.PI / 6 + (d * Math.PI) / 3;
      const lines: LineSegment[] = [];
      const center: LineSegment = new LineSegment(
        new Point(gh.width / 2, gh.height / 2),
        Math.tan(a) > 1000000
          ? new Point(gh.width / 2, gh.height / 2 - 100)
          : new Point(gh.width / 2 + 100, gh.height / 2 + Math.tan(a) * 100)
      );
      for (let i = -70; i < 70; i++) {
        lines.push(getLineOffset(center, i * this.spacing));
      }

      this.grid.push(lines);
    }
  }

  render(gh: GraphicsHandler) {
    this.grid.forEach((d) => d.forEach((l) => l.renderInfinit(gh)));
  }
}
