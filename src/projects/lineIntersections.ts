import GraphicsHandler from "../graphicsHandler.js";
import Project from "../projects/project.js";
import Line from "../primitives/line.js";
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
  lines: Line[];
  intersections: Point[];

  constructor(gh: GraphicsHandler) {
    this.gh = gh;
    this.lines = [];
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
    this.intersections = this.findIntersections(this.lines);

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
      this.lines.push(new Line(p1, p2));
    }
  }

  findIntersectionsNaive(lines: Line[]): Point[] {
    const intersections: Point[] = [];
    lines.forEach((l1, i) => {
      for (let j = i + 1; j < lines.length; j++) {
        intersections.push(getLineSegmentsIntersection(l1, lines[j]));
      }
    });
    return intersections.filter(Boolean);
  }

  findIntersections(lineSegments: Line[]): Point[] {
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
