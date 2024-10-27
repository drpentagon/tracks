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
import { getGridAxes, getGridLine } from "../gridMath.js";

export default class IsoGrid implements ComposedObject {
  corners: Point[];

  constructor(gh: GraphicsHandler) {
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

  render(gh: GraphicsHandler) {
    gh.fillStyle = "rgba(0,0,0,0.03)";
    getGridAxes().forEach((axe, i) => {
      const distances = this.corners.map((p) => getDistanceFromLine(axe, p));
      let from = -Math.ceil(Math.max(...distances));
      const to = -Math.floor(Math.min(...distances));
      if (from % 2 === 0) from -= 1;
      for (let j = from; j < to; j += 2) {
        const l1: [Point, Point] = getLineOffset(axe, j).getInfinitPoints(gh);
        const l2: [Point, Point] = getLineOffset(axe, j + 1).getInfinitPoints(
          gh
        );
        gh.drawPolygon([l1[0], l1[1], l2[1], l2[0]], true);
      }
    });
  }

  fillPosition(coord: number[], gh: GraphicsHandler) {
    const bounds: LineSegment[][] = getGridAxes().map((axe, i) => {
      return [getLineOffset(axe, coord[i]), getLineOffset(axe, coord[i] - 1)];
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
}
