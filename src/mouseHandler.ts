import Point from "./primitives/point.js";
const CONTAINER: HTMLElement = document.querySelector(".graphics-wrapper");

class MouseHandler {
  pos: Point;

  constructor() {
    this.pos = new Point(0, 0);
    CONTAINER.addEventListener("mousemove", (e) => this.updatePosition(e));
  }

  updatePosition(e: MouseEvent) {
    this.pos.x = e.clientX;
    this.pos.y = e.clientY;
  }
}

export default new MouseHandler();
