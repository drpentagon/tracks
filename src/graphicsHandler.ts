import Point from "./primitives/point";

export default class GraphicsHandler {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  constructor(parentNode: HTMLElement) {
    const width = parentNode.offsetWidth;
    const height = parentNode.offsetHeight;
    this.canvas = document.createElement("canvas");
    this.canvas.className = "canvas";
    this.canvas.setAttribute("width", `${width}`);
    this.canvas.setAttribute("height", `${height}`);
    this.canvas.style.width = `${width}px`;
    this.canvas.style.height = `${height}px`;

    parentNode.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d");
    this.ctx.lineWidth = 0.5;
  }

  set strokeStyle(style: string) {
    this.ctx.strokeStyle = style;
  }

  set fillStyle(style: string) {
    this.ctx.fillStyle = style;
  }

  drawCircle(p: Point, r: number) {
    const { ctx } = this;
    ctx.beginPath();
    ctx.arc(p.x, p.y, r, 0, 2 * Math.PI);
    ctx.fill();
  }

  drawLine(p1: Point, p2: Point) {
    const { ctx } = this;
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.stroke();
  }
}
