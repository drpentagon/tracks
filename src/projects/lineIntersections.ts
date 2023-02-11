import GraphicsHandler from "../graphicsHandler.js";
import Project from "../projects/project.js";
import LineSegment from "../primitives/lineSegment.js";
import Point from "../primitives/point.js";
import BST from "../datastructures/BST.js";
import { getLineSegmentsIntersection } from "../mathHelper.js";

export default class LineIntersections implements Project {
  title: string = "LINE SEGMENT INTERSECTIONS";
  backgroundColor: string = "#FFF";
  color: string = "#000";
  gh: GraphicsHandler;
  now: number;
  then: number;
  lineSegments: LineSegment[];
  intersections: Point[];

  constructor(gh: GraphicsHandler) {
    this.gh = gh;
    this.lineSegments = [];
    this.intersections = [];
    const tree = new BST<number>();
    tree.insert(6);
    tree.insert(9);
    tree.insert(3);
    tree.insert(2);
    tree.insert(1);
    tree.insert(4);
    tree.insert(0);
    tree.insert(12);
    tree.insert(7);
    tree.insert(18);
    tree.insert(2);

    console.log(tree);

    this.genereateLines(10);
    this.intersections = this.findIntersections(this.lineSegments);

    // const now = Date.now();
    // this.intersections = this.findIntersectionsNaive(this.lines);
    // const elapsedTime = Date.now() - now;
    // console.log(
    //   `Found ${this.intersections.length} intersections in ${elapsedTime} ms`
    // );
  }

  genereateLines(count: number) {
    const width: number = this.gh.parent.offsetWidth;
    const height: number = this.gh.parent.offsetHeight;
    for (let i: number = 0; i < count; i++) {
      const p1 = new Point(Math.random() * width, Math.random() * height);
      const p2 = new Point(Math.random() * width, Math.random() * height);
      this.lineSegments.push(new LineSegment(p1, p2));
    }
  }

  findIntersectionsNaive(lineSegments: LineSegment[]): Point[] {
    const intersections: Point[] = [];
    lineSegments.forEach((l1, i) => {
      for (let j = i + 1; j < lineSegments.length; j++) {
        intersections.push(getLineSegmentsIntersection(l1, lineSegments[j]));
      }
    });
    return intersections.filter(Boolean);
  }

  findIntersections(lineSegments: LineSegment[]): Point[] {
    return null;
  }

  gameLoop() {
    // this.lines.forEach((l) => {
    //   l.render(this.gh);
    // });
    // this.intersections.forEach((p) => {
    //   p.render(this.gh);
    // });
  }
}
