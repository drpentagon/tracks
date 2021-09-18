import GraphicsHandler from "../graphicsHandler";
import Primitive from "./primitive";
import Point from "./point.js";

export default class Arc implements Primitive {
  c: Point;
  r: number;
  startAngle: number;
  endAngle: number;
  counterClockwise: boolean;
  color: string;

  constructor(
    c: Point,
    r: number,
    startAngle: number,
    endAngle: number,
    counterClockwise: boolean = false
  ) {
    this.c = c;
    this.r = r;
    this.startAngle = startAngle;
    this.endAngle = endAngle;
    this.color = "rgb(200,200,200)";
    this.counterClockwise = counterClockwise;
  }

  render(gh: GraphicsHandler) {
    gh.strokeStyle = this.color;
    gh.drawArc(
      this.c,
      this.r,
      this.startAngle,
      this.endAngle,
      this.counterClockwise
    );
  }
}
