import GraphicsHandler from "../graphicsHandler";
import Primitive from "./primitive";

export default class Point implements Primitive {
  x: number;
  y: number;
  dx: number;
  dy: number;
  color: string;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.dx = this.dy = 0;
    this.color = "rgba(0,0,0,0.4)";
  }

  update(delta: number) {
    this.x += this.dx * delta;
    this.y += this.dy * delta;
  }

  render(gh: GraphicsHandler) {
    gh.fillStyle = this.color;
    gh.drawCircle(this, 4, true);
  }
}
