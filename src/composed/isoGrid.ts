import ComposedObject from "./composedObject";
import GraphicsHandler from "../graphicsHandler";
import LineSegment from "../primitives/lineSegment.js";
import Point from "../primitives/point.js";
import gtr from "../globalTranslation.js";
import { getLineOffset, getDistanceFromLine } from "../mathHelper.js";

export default class IsoGrid implements ComposedObject {
  axes: number[][];
  spacing: number;
  corners: Point[];

  constructor(gh: GraphicsHandler) {
    this.axes = [];
    for (let d = 0; d < 3; d++) {
      const angle: number = -Math.PI / 6 + (d * Math.PI) / 3;
      const dy = Math.tan(angle);
      this.axes.push(dy > 1000000 ? [0, -100] : [100, -dy * 100]);
    }
    this.setViewport(gh);
  }

  setViewport(gh: GraphicsHandler): void {
    this.corners = [
      new Point(0, 0),
      new Point(gh.width, 0),
      new Point(gh.width, gh.height),
      new Point(0, gh.height),
    ];
  }

  render(gh: GraphicsHandler) {
    this.spacing = 30 * gtr.zoom;
    this.axes.forEach((p2) => {
      const center: LineSegment = new LineSegment(
        gtr.toScreen(new Point(0, 0)),
        gtr.toScreen(new Point(p2[0], p2[1]))
      );
      const distances = this.corners.map(
        (p) => getDistanceFromLine(center, p) / this.spacing
      );

      const to = -Math.floor(Math.min(...distances));
      const from = -Math.ceil(Math.max(...distances));
      for (let i = from; i < to; i++) {
        getLineOffset(center, i * this.spacing).renderInfinit(gh);
      }
    });
  }
}
