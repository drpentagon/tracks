import GraphicsHandler from "../graphicsHandler";

export default class Point {
  x: number;
  y: number;
  color: string;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.color = "rgb(255,0,0)";
  }

  render(gh: GraphicsHandler) {
    gh.fillStyle = this.color;
    gh.drawCircle(this, 5);
  }
}
