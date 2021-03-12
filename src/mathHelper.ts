import Line from "./primitives/line.js";
import Point from "./primitives/point.js";

export { getLinesIntersection };

function getLinesIntersection(l1: Line, l2: Line): Point {
  if (!l1 || !l2 || l1.m === l2.m) return null;

  const x = (l2.b - l1.b) / (l1.m - l2.m);
  const y = l1.m * x + l1.b;

  return new Point(x, y);
}
