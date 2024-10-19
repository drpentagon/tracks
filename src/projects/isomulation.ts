import GraphicsHandler from "../graphicsHandler.js";
import Project from "./project.js";
import IsoGrid from "../composed/isoGrid.js";
import gtr from "../globalTranslation.js";
import Point from "../primitives/point.js";
import mh from "../mouseHandler.js";

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

  constructor(gh: GraphicsHandler) {
    this.staticGraphic = new GraphicsHandler(STATIC_CONTAINER);
    this.gh = gh;
    gtr.zoom = 40;
    gtr.pan = new Point(20, 50);
    this.grid = new IsoGrid(this.staticGraphic);
    this.grid.render(this.staticGraphic);

    window.onresize = () => {
      this.gh.updateSize();
      this.staticGraphic.updateSize();
      this.grid.setViewport(this.staticGraphic);
      this.staticGraphic.clear();
      this.grid.render(this.staticGraphic);
    };
  }

  gameLoop() {
    this.gh.clear();
    this.grid.fillPosition(
      this.grid.getGridPosition(mh.pos.x, mh.pos.y),
      this.gh
    );
    requestAnimationFrame(() => this.gameLoop());
  }
}
