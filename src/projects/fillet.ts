import GraphicsHandler from "../graphicsHandler";
import Project from "./project";
import Primitive from "../primitives/primitive.js";
import Point from "../primitives/point.js";
import LineSegment from "../primitives/lineSegment.js";
import Arc from "../primitives/arc.js";

import {
  getLinesIntersection,
  getProjection,
  getLineOffset,
  getArcFromPoints,
} from "../mathHelper.js";

export default class Fillet implements Project {
  backgroundColor: string = "#FFF";
  color: string = "#666";
  title: string = "BORDER RADIUS";
  gh: GraphicsHandler;
  now: number;
  then: number;
  objects: Primitive[];
  p: Point;
  l1: LineSegment;
  l2: LineSegment;

  constructor(gh: GraphicsHandler) {
    this.gh = gh;
    this.p = new Point(700, -200);
    this.l1 = new LineSegment(new Point(100, 100), new Point(300, 400));
    this.l2 = new LineSegment(new Point(400, 500), this.p);
    this.objects = [
      this.l1,
      this.l2,
      this.l1.p1,
      this.l1.p2,
      this.l2.p1,
      this.l2.p2,
    ];
  }

  gameLoop() {
    this.now = Date.now();

    if (this.then != null) {
      let delta = (this.now - this.then) / 1000;
      this.p.y += delta * 40;
      this.l2.updateLineEquation();
      // Data.instance.update(delta);
    }

    this.then = this.now;

    const radius = 150;
    const offset: number = this.l1.isToTheRight(this.p) ? radius : -radius;
    const l1o: LineSegment = getLineOffset(this.l1, offset);
    const l2o: LineSegment = getLineOffset(this.l2, offset);
    const intersection: Point = getLinesIntersection(l1o, l2o);
    const c: Arc = new Arc(intersection, radius, 0, 2 * Math.PI);
    const p1: Point = getProjection(this.l1, intersection, offset);
    const p2: Point = getProjection(this.l2, intersection, offset);
    const r1: LineSegment = new LineSegment(intersection, p1);
    const r2: LineSegment = new LineSegment(intersection, p2);
    const arc: Arc = getArcFromPoints(p1, p2, intersection, radius, offset < 0);
    const l1: LineSegment = new LineSegment(this.l1.p1, p1);
    const l2: LineSegment = new LineSegment(p2, this.l2.p2);

    this.gh.clear();
    this.objects.forEach((p) => p.render(this.gh));
    intersection.render(this.gh);
    c.render(this.gh);
    l1o.render(this.gh);
    l2o.render(this.gh);
    p1.render(this.gh);
    p2.render(this.gh);
    r1.render(this.gh);
    r2.render(this.gh);
    this.gh.lineWidth = 3;
    arc.color = "rgb(50,50,50)";
    this.l1.color = "rgb(50,50,50)";
    this.l2.color = "rgb(50,50,50)";
    arc.render(this.gh);
    l1.render(this.gh);
    l2.render(this.gh);
    this.gh.lineWidth = 0.5;

    requestAnimationFrame(() => this.gameLoop());
  }
}
