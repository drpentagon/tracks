import GraphicsHandler from "../graphicsHandler.js";
import Project from "./project.js";
import IsoGrid from "../composed/isoGrid.js";
import gtr from "../globalTranslation.js";
import Point from "../primitives/point.js";
import mh from "../mouseHandler.js";
import Colors from "../colors.js";

const STATIC_CONTAINER: HTMLElement = document.querySelector(
  ".static-graphics-wrapper"
);

export default class Isomulation implements Project {
  backgroundColor: string = "#FFFF";
  color: string = "#600";
  title: string = "ISOMULATION";
  gh: GraphicsHandler;
  staticGraphic: GraphicsHandler;
  now: number;
  then: number;
  grid: IsoGrid;
  panStart: Point;

  constructor(gh: GraphicsHandler) {
    this.staticGraphic = new GraphicsHandler(STATIC_CONTAINER);
    this.gh = gh;
    gtr.zoom = 30;
    gtr.pan = new Point(0, 0);
    this.grid = new IsoGrid(this.staticGraphic);
    this.grid.render(this.staticGraphic);
    Colors.initialize();

    window.onresize = () => {
      this.gh.updateSize();
      this.staticGraphic.updateSize();
      this.grid.setViewport(this.staticGraphic);
      this.staticGraphic.clear();
      this.grid.render(this.staticGraphic);
    };

    window.addEventListener("touchstart", (e) => {
      this.panStart = new Point(e.touches[0].clientX, e.touches[0].clientY);
    });

    window.addEventListener("touchmove", (e) => {
      const p: Point = new Point(e.touches[0].clientX, e.touches[0].clientY);
      this.updatePanPosition(p.x - this.panStart.x, p.y - this.panStart.y);
      this.panStart = p;
    });

    window.addEventListener("wheel", (e) =>
      this.updatePanPosition(-e.deltaX, -e.deltaY)
    );
  }

  updatePanPosition(dX: number, dY: number): void {
    gtr.pan.x += dX / gtr.zoom;
    gtr.pan.y += dY / gtr.zoom;

    this.staticGraphic.clear();
    this.grid.setViewport(this.staticGraphic);
    this.grid.render(this.staticGraphic);
  }

  gameLoop() {
    this.gh.clear();
    const coord = this.grid.getGridPosition(mh.pos.x, mh.pos.y);
    this.grid.fillSquare([coord[0], coord[1]], this.gh);
    requestAnimationFrame(() => this.gameLoop());
  }
}
