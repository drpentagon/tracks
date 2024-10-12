import GraphicsHandler from "../graphicsHandler";
import Primitive from "./primitive";
import Point from "./point.js";

export default class LineSegment implements Primitive {
  p1: Point;
  p2: Point;
  lP1: Point;
  lP2: Point;
  m: number;
  b: number;
  vertical: boolean;
  color: string;
  lastUpdated: number;

  constructor(p1: Point, p2: Point) {
    this.p1 = p1;
    this.p2 = p2;
    this.color = "rgb(200,200,200)";
    this.updateLineEquation();
  }

  updateLineEquation() {
    const { p1, p2 } = this;
    this.vertical = p1.x === p2.x;
    if (this.vertical) {
      this.m = undefined;
      this.b = undefined;
      return;
    }

    this.m = (p2.y - p1.y) / (p2.x - p1.x);
    this.b = p1.y - this.m * p1.x;
  }

  calculateLinePoints(gh) {
    if (this.lastUpdated !== gh.lastUpdated) {
      this.lP1 = this.vertical ? new Point(this.p1.x, 0) : new Point(0, this.b);
      this.lP2 = this.vertical
        ? new Point(this.p1.x, gh.height)
        : new Point(gh.width, gh.width * this.m + this.b);
      this.lastUpdated = gh.lastUpdated;
    }
  }

  isToTheRight(p: Point): boolean {
    const { p1, p2 } = this;
    return (p.x - p1.x) * (p2.y - p1.y) - (p.y - p1.y) * (p2.x - p1.x) < 0;
  }

  render(gh: GraphicsHandler) {
    // const r: Number = Math.floor(Math.random() * 256);
    // const g: Number = Math.floor(Math.random() * 256);
    // const b: Number = Math.floor(Math.random() * 256);
    // gh.strokeStyle = `rgba(${r},${g},${b},0.1)`;
    gh.strokeStyle = "rgba(0,0,40,0.4)";
    gh.drawLine(this.p1, this.p2);
  }

  renderInfinit(gh: GraphicsHandler) {
    this.calculateLinePoints(gh);
    gh.drawLine(this.lP1, this.lP2);
  }
}
