import ComposedObject from "./composedObject";
import GraphicsHandler from "../graphicsHandler";
import LineSegment from "../primitives/lineSegment.js";
import Point from "../primitives/point.js";
import { getLineOffset, getDistanceFromLine } from "../mathHelper.js";

export default class IsoGrid implements ComposedObject {
  spacing: number;
  grid: LineSegment[][];

  constructor(spacing: number, gh: GraphicsHandler) {
    this.spacing = spacing;
    this.grid = [];
    const corners: Point[] = [
      new Point(0, 0),
      new Point(gh.width, 0),
      new Point(gh.width, gh.height),
      new Point(0, gh.height),
    ];

    for (let d = 0; d < 3; d++) {
      const a: number = -Math.PI / 6 + (d * Math.PI) / 3;
      const lines: LineSegment[] = [];
      const center: LineSegment = new LineSegment(
        new Point(0, 0),
        Math.tan(a) > 1000000
          ? new Point(0, -100)
          : new Point(100, -Math.tan(a) * 100)
      );
      const distances = corners.map(
        (p) => getDistanceFromLine(center, p) / this.spacing
      );

      const to = -Math.floor(Math.min(...distances));
      const from = -Math.ceil(Math.max(...distances));
      for (let i = from; i < to; i++) {
        lines.push(getLineOffset(center, i * this.spacing));
      }

      this.grid.push(lines);
    }
  }

  render(gh: GraphicsHandler) {
    this.grid.forEach((d) => d.forEach((l) => l.renderInfinit(gh)));
  }
}
