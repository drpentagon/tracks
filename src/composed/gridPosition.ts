import ComposedObject from "./composedObject";
import GraphicsHandler from "../graphicsHandler";
import LineSegment from "../primitives/lineSegment.js";
import Point from "../primitives/point.js";
import { getLineOffset, getLinesIntersection } from "../mathHelper.js";
import { getGridAxes, getGridLine } from "../gridMath.js";
import Cube from "../primitives/cube";

const SHADES = ["color", "highlight", "shadow"];

export default class GridPosition implements ComposedObject {
  pos: [number, number, number];
  cube: Cube;
  shade: string;

  constructor(pos: [number, number, number], cube: Cube, side: number) {
    this.cube = cube;
    this.shade = SHADES[side] || SHADES[0];
    this.pos = pos;
  }

  render(gh: GraphicsHandler) {
    const bounds: LineSegment[][] = getGridAxes().map((axe, i) => {
      return [
        getLineOffset(axe, this.pos[i]),
        getLineOffset(axe, this.pos[i] - 1),
      ];
    });
    const p1: Point = getLinesIntersection(bounds[0][0], bounds[1][0]);
    const p2: Point = getLinesIntersection(bounds[0][1], bounds[1][1]);
    const left: boolean = Math.abs(p1.x - bounds[2][0].p1.x) < 0.5;
    const p3: Point = getLinesIntersection(
      bounds[0][left ? 0 : 1],
      bounds[1][left ? 1 : 0]
    );
    gh.strokeStyle = this.cube.material[this.shade].rgba;
    gh.fillStyle = this.cube.material[this.shade].rgba;
    gh.drawPolygon([p1, p2, p3], true);
  }
}
