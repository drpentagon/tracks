import ComposedObject from "./composedObject";
import GraphicsHandler from "../graphicsHandler";
import LineSegment from "../primitives/lineSegment.js";
import Point from "../primitives/point.js";
import gtr from "../globalTranslation.js";
import { getLineOffset, getDistanceFromLine } from "../mathHelper.js";
import mh from "../mouseHandler.js";

export default class IsoGrid implements ComposedObject {
  axes: LineSegment[];
  corners: Point[];
  hovered: number[];

  constructor(gh: GraphicsHandler) {
    this.axes = [];
    this.hovered = [];
    for (let d = 0; d < 3; d++) {
      const angle: number = -Math.PI / 6 + (d * Math.PI) / 3;
      const dy = Math.tan(angle);
      this.axes.push(
        new LineSegment(
          new Point(0, 0),
          dy > 1000000 ? new Point(0, -100) : new Point(100, -dy * 100)
        )
      );
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

  update(): void {
    this.hovered = this.axes.map(
      (center) =>
        -Math.floor(
          getDistanceFromLine(center, gtr.toGlobal(mh.pos.x, mh.pos.y))
        )
    );
  }

  render(gh: GraphicsHandler) {
    this.axes.forEach((s, i) => {
      const center: LineSegment = new LineSegment(
        gtr.toScreen(s.p1),
        gtr.toScreen(s.p2)
      );
      const distances = this.corners.map(
        (p) => getDistanceFromLine(center, p) / gtr.zoom
      );

      const to = -Math.floor(Math.min(...distances));
      const from = -Math.ceil(Math.max(...distances));
      const marked = this.hovered[i] || 0;
      for (let j = from; j < to; j++) {
        gh.strokeStyle =
          j === marked || j === marked - 1
            ? "rgba(180,0,0,1.0)"
            : "rgba(180,180,180,1.0)";
        getLineOffset(center, j * gtr.zoom).renderInfinit(gh);
      }
    });
  }
}
