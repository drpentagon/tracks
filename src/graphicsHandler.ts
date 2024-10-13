import Point from "./primitives/point";
import gtr from "./globalTranslation.js";

export default class GraphicsHandler {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
  parent: HTMLElement;
  lastUpdated: number;

  constructor(parentNode: HTMLElement) {
    this.parent = parentNode;
    this.updateSize();
  }

  updateSize() {
    this.width = this.parent.offsetWidth;
    this.height = this.parent.offsetHeight;
    this.canvas && this.canvas.remove();
    this.canvas = document.createElement("canvas");
    this.canvas.className = "canvas";
    this.canvas.setAttribute("width", `${this.width}`);
    this.canvas.setAttribute("height", `${this.height}`);
    this.canvas.style.width = `${this.width}px`;
    this.canvas.style.height = `${this.height}px`;
    this.parent.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d");
    this.ctx.lineWidth = 0.5;
    this.lastUpdated = Date.now();
  }

  set strokeStyle(style: string) {
    this.ctx.strokeStyle = style;
  }

  set fillStyle(style: string) {
    this.ctx.fillStyle = style;
  }

  set lineWidth(width: number) {
    this.ctx.lineWidth = width;
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

  drawArc(
    p: Point,
    r: number,
    startAngle: number,
    endAngle: number,
    counterClockwise: boolean = false
  ) {
    const { ctx } = this;
    ctx.beginPath();
    ctx.arc(p.x, p.y, r, startAngle, endAngle, counterClockwise);
    ctx.stroke();
  }

  drawLine(p1: Point, p2: Point) {
    this.beginPath();
    this.moveTo(p1);
    this.lineTo(p2);
    this.stroke();
  }

  drawSquare(p: Point, s: number, filled: boolean = false) {
    const { ctx } = this;
    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
    ctx.lineTo(p.x + s, p.y);
    ctx.lineTo(p.x + s, p.y + s);
    ctx.lineTo(p.x, p.y + s);
    ctx.lineTo(p.x, p.y);
    filled ? ctx.fill() : ctx.stroke();
  }

  drawPolygon(points: Point[], filled: boolean = false): void {
    this.beginPath();
    this.moveTo(points[points.length - 1]);
    points.forEach((p) => this.lineTo(p));
    filled ? this.fill() : this.stroke();
  }

  moveTo(p: Point): void {
    const { ctx } = this;
    ctx.moveTo(...gtr.toScreen(p));
  }

  lineTo(p: Point): void {
    const { ctx } = this;
    ctx.lineTo(...gtr.toScreen(p));
  }

  beginPath(): void {
    const { ctx } = this;
    ctx.beginPath();
  }

  fill(): void {
    const { ctx } = this;
    ctx.fill();
  }

  stroke(): void {
    const { ctx } = this;
    ctx.stroke();
  }
}
