import ComposedObject from "./composedObject";
import GraphicsHandler from "../graphicsHandler";
import Point from "../primitives/point.js";
import gtr from "../globalTranslation.js";
import { getLineOffset, getDistanceFromLine } from "../mathHelper.js";
import { getGridAxes } from "../gridMath.js";

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
        gh.drawPolygon([l1[0], l1[1], l2[1], l2[0]]);
      }
    });
  }
}
