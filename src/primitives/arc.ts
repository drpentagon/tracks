import GraphicsHandler from "../graphicsHandler";
import Primitive from "./primitive";
import Point from "./point.js";

export default class Arc implements Primitive {
  c: Point;
  r: number;
  color: string;

  constructor(c: Point, r: number) {
    this.c = c;
    this.r = r;
    this.color = "rgb(255,0,0)";
  }

  render(gh: GraphicsHandler) {
    gh.fillStyle = this.color;
    gh.drawCircle(this.c, this.r);
  }
}
