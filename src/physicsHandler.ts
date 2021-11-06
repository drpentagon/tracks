import Point from "./primitives/point.js";

export default class PhysicsHandler {
  surroundingForce: number;
  friction: number;
  pointAttraction: number;
  canvasWidth: number;
  canvasHeight: number;

  constructor(canvasElement: HTMLElement) {
    this.canvasWidth = canvasElement.offsetWidth;
    this.canvasHeight = canvasElement.offsetHeight;
    this.surroundingForce = 5000;
    this.friction = 0.99;
    this.pointAttraction = 500;
  }

  setCanvasSize(element: HTMLElement) {
    this.canvasWidth = element.offsetWidth;
    this.canvasHeight = element.offsetHeight;
  }

  addSurroundingForces(point: Point) {
    point.dx +=
      this.surroundingForce / point.x -
      this.surroundingForce / (this.canvasWidth - point.x);
    point.dy +=
      this.surroundingForce / point.y -
      this.surroundingForce / (this.canvasHeight - point.y);
  }

  addFriction(point: Point) {
    point.dx *= this.friction;
    point.dy *= this.friction;
  }

  addPointAttraction(p1: Point, p2: Point, infinit: boolean = true) {
    const dx: number = p1.x - p2.x;
    const dy: number = p1.y - p2.y;
    const d = Math.sqrt(dx * dx + dy * dy);
    if (infinit || d < 500) {
      const f: number = this.pointAttraction / d;
      const fx: number = (f * dx) / (Math.abs(dx) + Math.abs(dy));
      const fy: number = (f * dy) / (Math.abs(dx) + Math.abs(dy));
      p1.dx -= fx;
      p1.dy -= fy;
      p2.dx += fx;
      p2.dy += fy;
    }
  }
}
