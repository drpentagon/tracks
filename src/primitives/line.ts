import GraphicsHandler from "../graphicsHandler";
import Primitive from "./primitive";
import Point from "./point.js";

export default class Line implements Primitive {
  m: number;
  b: number;
  vertical: boolean;
  color: string;

  constructor(p1: Point, p2: Point) {
    this.vertical = p1.x === p2.x;
    if (this.vertical) {
      this.m = undefined;
      this.b = undefined;
      return;
    }

    this.m = (p2.y - p1.y) / (p2.x - p1.x);
    this.b = p1.y - this.m * p1.x;
  }

  render(gh: GraphicsHandler) {
    gh.strokeStyle = "rgba(0,0,40,0.4)";
    const p1: Point = new Point(0, this.b);
    const p2: Point = new Point(gh.width, gh.width * this.m + this.b);
    gh.drawLine(p1, p2);
  }
}
