import ComposedObject from "./composedObject";
import GraphicsHandler from "../graphicsHandler";
import LineSegment from "../primitives/lineSegment.js";
import Point from "../primitives/point.js";
import { getLineOffset, getLinesIntersection } from "../mathHelper.js";
import { getGridAxes, getGridLine } from "../gridMath.js";
import Cube from "../primitives/cube";

const SHADES = ["color", "color", "highlight", "highlight", "shadow", "shadow"];
const EDGES: [number, number, number][] = [
  [2, 0, 1],
  [0, 1, 2],
  [1, 2, 0],
  [1, 2, 0],
  [0, 1, 2],
  [2, 0, 1],
];

export default class GridPosition implements ComposedObject {
  pos: [number, number, number];
  side: number;
  cube: Cube;
  shade: string;
  edges: [number, number, number];

  constructor(pos: [number, number, number], cube: Cube, side: number) {
    this.cube = cube;
    this.side = side;
    this.shade = SHADES[side] || SHADES[0];
    this.edges = EDGES[side] || EDGES[0];
    this.pos = pos;
  }

  render(gh: GraphicsHandler) {
    const bounds: LineSegment[][] = getGridAxes().map((axe, i) => {
      return [
        getLineOffset(axe, this.pos[i]),
        getLineOffset(axe, this.pos[i] - 1),
      ];
    });
    const points: Point[] = [];
    points.push(getLinesIntersection(bounds[0][0], bounds[1][0]));
    points.push(getLinesIntersection(bounds[0][1], bounds[1][1]));
    const left: boolean = Math.abs(points[0].x - bounds[2][0].p1.x) < 0.5;
    points.push(
      getLinesIntersection(bounds[0][left ? 0 : 1], bounds[1][left ? 1 : 0])
    );
    gh.strokeStyle = "rgba(0,0,0,0.5)";
    gh.fillStyle = this.cube.material[this.shade].rgba;
    gh.drawPolygon(points);
    gh.drawPolygonEdge([
      points[this.edges[0]],
      points[this.edges[1]],
      points[this.edges[2]],
    ]);
    gh.strokeStyle = this.cube.material[this.shade].rgba;
    gh.drawPolygonEdge([points[this.edges[2]], points[this.edges[0]]]);
  }
}
