import GraphicsHandler from "../graphicsHandler";
import Primitive from "./primitive";
import Point from "./point.js";

export default class Line implements Primitive {
  p1: Point;
  p2: Point;
  m: number;
  b: number;
  vertical: boolean;
  color: string;

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

  isToTheRight(p: Point): boolean {
    const { p1, p2 } = this;
    return (p.x - p1.x) * (p2.y - p1.y) - (p.y - p1.y) * (p2.x - p1.x) < 0;
  }

  render(gh: GraphicsHandler) {
    gh.strokeStyle = this.color;
    gh.drawLine(this.p1, this.p2);
  }
}
