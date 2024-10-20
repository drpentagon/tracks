import ComposedObject from "./composedObject";
import GraphicsHandler from "../graphicsHandler";
import LineSegment from "../primitives/lineSegment.js";
import Point from "../primitives/point.js";
import gtr from "../globalTranslation.js";
import {
  getLineOffset,
  getDistanceFromLine,
  getLinesIntersection,
} from "../mathHelper.js";
import mh from "../mouseHandler.js";

export default class IsoGrid implements ComposedObject {
  axes: LineSegment[];
  corners: Point[];

  constructor(gh: GraphicsHandler) {
    this.axes = [];
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
      gtr.toGlobal(0, 0),
      gtr.toGlobal(gh.width, 0),
      gtr.toGlobal(gh.width, gh.height),
      gtr.toGlobal(0, gh.height),
    ];
  }

  getGridPosition(x: number, y: number): number[] {
    return this.axes.map(
      (center) => -Math.floor(getDistanceFromLine(center, gtr.toGlobal(x, y)))
    );
  }

  render(gh: GraphicsHandler) {
    gh.fillStyle = "rgba(0,0,0,0.05)";
    this.axes.forEach((center, i) => {
      const distances = this.corners.map((p) => getDistanceFromLine(center, p));
      let from = -Math.ceil(Math.max(...distances));
      const to = -Math.floor(Math.min(...distances));
      if (from % 2 === 0) from -= 1;
      for (let j = from; j < to; j += 2) {
        const l1: [Point, Point] = getLineOffset(center, j).getInfinitPoints(
          gh
        );
        const l2: [Point, Point] = getLineOffset(
          center,
          j + 1
        ).getInfinitPoints(gh);
        gh.drawPolygon([l1[0], l1[1], l2[1], l2[0]], true);
      }
    });
  }

  fillPosition(coord: number[], gh: GraphicsHandler) {
    const bounds: LineSegment[][] = this.axes.map((center, i) => {
      return [
        getLineOffset(center, coord[i]),
        getLineOffset(center, coord[i] - 1),
      ];
    });
    const p1: Point = getLinesIntersection(bounds[0][0], bounds[1][0]);
    const p2: Point = getLinesIntersection(bounds[0][1], bounds[1][1]);
    const left: boolean = Math.abs(p1.x - bounds[2][0].p1.x) < 0.5;
    const p3: Point = getLinesIntersection(
      bounds[0][left ? 0 : 1],
      bounds[1][left ? 1 : 0]
    );
    gh.strokeStyle = "rgba(0,0,0,0.7)";
    gh.fillStyle = "rgba(0,0,0,0.3)";
    gh.drawPolygon([p1, p2, p3], true);
  }

  fillSquare(coord: [number, number], gh: GraphicsHandler) {
    const bounds = coord
      .map((c, d) => [this.getLine(c, d), this.getLine(c - 1, d)])
      .reduce((arr, c) => {
        arr.push(c[0]);
        arr.push(c[1]);
        return arr;
      }, []);

    const p1: Point = getLinesIntersection(bounds[0], bounds[2]);
    const p2: Point = getLinesIntersection(bounds[2], bounds[1]);
    const p3: Point = getLinesIntersection(bounds[1], bounds[3]);
    const p4: Point = getLinesIntersection(bounds[3], bounds[0]);

    gh.fillStyle = "rgba(0,0,0,0.3)";
    gh.drawPolygon([p1, p2, p3, p4], true);
  }

  getLine(offset: number, dimension: number): LineSegment {
    if ([0, 1, 2].indexOf(dimension) < 0) return null;
    return getLineOffset(this.axes[dimension], offset);
  }
}
