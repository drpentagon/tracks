import Point from "./primitives/point";

export default class GraphicsHandler {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;

  constructor(parentNode: HTMLElement) {
    this.width = parentNode.offsetWidth;
    this.height = parentNode.offsetHeight;
    this.canvas = document.createElement("canvas");
    this.canvas.className = "canvas";
    this.canvas.setAttribute("width", `${this.width}`);
    this.canvas.setAttribute("height", `${this.height}`);
    this.canvas.style.width = `${this.width}px`;
    this.canvas.style.height = `${this.height}px`;

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

  clear() {
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  drawCircle(p: Point, r: number, filled: boolean = false) {
    const { ctx } = this;
    ctx.beginPath();
    ctx.arc(p.x, p.y, r, 0, 2 * Math.PI);
    filled ? ctx.fill() : ctx.stroke();
  }

  drawLine(p1: Point, p2: Point) {
    const { ctx } = this;
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.stroke();
  }
}
