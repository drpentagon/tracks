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
    this.color = "rgb(255,0,0)";
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

  render(gh: GraphicsHandler) {
    gh.strokeStyle = this.color;
    gh.drawLine(this.p1, this.p2);
  }
}
