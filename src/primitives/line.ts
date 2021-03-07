import GraphicsHandler from "../graphicsHandler";
import Primitive from "./primitive";
import Point from "./point";

export default class Line implements Primitive {
  p1: Point;
  p2: Point;
  color: string;

  constructor(p1: Point, p2: Point) {
    this.p1 = p1;
    this.p2 = p2;
    this.color = "rgb(255,0,0)";
  }

  render(gh: GraphicsHandler) {
    gh.strokeStyle = this.color;
    gh.drawLine(this.p1, this.p2);
  }
}
