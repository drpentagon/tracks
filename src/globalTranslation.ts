import Point from "./primitives/point.js";

class GlobalTranslation {
  zoomLevel: number;
  p: Point;

  constructor() {
    this.zoomLevel = 1;
    this.p = new Point(0, 0);
  }

  set zoom(zoom: number) {
    this.zoomLevel = zoom;
  }

  get zoom(): number {
    return this.zoomLevel;
  }

  zoomIn(): void {
    this.zoomLevel = this.zoomLevel * 2;
  }

  zoomOut() {
    if (this.zoomLevel > 2) {
      this.zoomLevel = this.zoomLevel / 2;
    }
  }

  set pan(p: Point) {
    this.p.x += p.x;
    this.p.y += p.y;
  }

  get pan(): Point {
    return this.p;
  }

  toScreen(p: Point): Point {
    return new Point(
      (p.x + this.p.x) * this.zoom,
      (p.y + this.p.y) * this.zoom
    );
  }

  toGlobal(x: number, y: number): Point {
    return new Point(x / this.zoom - this.p.x, y / this.zoom - this.p.y);
  }

  scaleToGlobal(x: number, y: number): Point {
    return new Point(x / this.zoom, y / this.zoom);
  }
}

export default new GlobalTranslation();
