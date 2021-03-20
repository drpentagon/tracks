import Line from "./primitives/line.js";
import Point from "./primitives/point.js";

export { getLinesIntersection, getNormal, getLineOffset };

function getLinesIntersection(l1: Line, l2: Line): Point {
  if (!l1 || !l2 || l1.m === l2.m) return null;

  const x = (l2.b - l1.b) / (l1.m - l2.m);
  const y = l1.m * x + l1.b;

  return new Point(x, y);
}

function getNormal(l: Line, p: Point, length: number): Line {
  let dy: number = l.p2.y - l.p1.y;
  let dx: number = l.p2.x - l.p1.x;
  const multiplier: number = length / Math.sqrt(dx * dx + dy * dy);

  return new Line(
    new Point(p.x, p.y),
    new Point(p.x - multiplier * dy, p.y + multiplier * dx)
  );
}

function getLineOffset(l, offset): Line {
  let dy: number = l.p2.y - l.p1.y;
  let dx: number = l.p2.x - l.p1.x;
  const multiplier: number = offset / Math.sqrt(dx * dx + dy * dy);

  return new Line(
    new Point(l.p1.x - multiplier * dy, l.p1.y + multiplier * dx),
    new Point(l.p2.x - multiplier * dy, l.p2.y + multiplier * dx)
  );
}
