import Arc from "./primitives/arc.js";
import Line from "./primitives/line.js";
import Point from "./primitives/point.js";

export {
  getLinesIntersection,
  getLineSegmentsIntersection,
  getNormal,
  getLineOffset,
  getProjection,
  getArcFromPoints,
};

function getLinesIntersection(l1: Line, l2: Line): Point {
  if (!l1 || !l2 || l1.m === l2.m) return null;

  const x = (l2.b - l1.b) / (l1.m - l2.m);
  const y = l1.m * x + l1.b;

  return new Point(x, y);
}

function getLineSegmentsIntersection(l1: Line, l2: Line): Point {
  const p: Point = getLinesIntersection(l1, l2);
  if (!p) return null;

  if (
    Math.min(l1.p1.x, l1.p2.x) < p.x &&
    Math.max(l1.p1.x, l1.p2.x) > p.x &&
    Math.min(l2.p1.x, l2.p2.x) < p.x &&
    Math.max(l2.p1.x, l2.p2.x) > p.x
  )
    return p;
  return null;
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

function getProjection(l: Line, c: Point, length: number): Point {
  let dy: number = l.p2.y - l.p1.y;
  let dx: number = l.p2.x - l.p1.x;
  const multiplier: number = length / Math.sqrt(dx * dx + dy * dy);

  return new Point(c.x + multiplier * dy, c.y - multiplier * dx);
}

function getArcFromPoints(
  p1: Point,
  p2: Point,
  c: Point,
  r: number,
  counterClockwise: boolean
): Arc {
  const startAngle: number = Math.atan2(p1.y - c.y, p1.x - c.x);
  const endAngle: number = Math.atan2(p2.y - c.y, p2.x - c.x);

  return new Arc(c, r, startAngle, endAngle, counterClockwise);
}
