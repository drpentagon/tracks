import GraphicsHandler from "../graphicsHandler";
import Project from "./project";
import IsoGrid from "../composed/isoGrid.js";
import gtr from "../globalTranslation.js";
import Point from "../primitives/point.js";

export default class Isomulation implements Project {
  backgroundColor: string = "#FFFF";
  color: string = "#600";
  title: string = "ISOMULATION";
  gh: GraphicsHandler;
  now: number;
  then: number;
  grid: IsoGrid;

  constructor(gh: GraphicsHandler) {
    this.gh = gh;
    gtr.zoom = 50;
    gtr.pan = new Point(20, 50);
    this.grid = new IsoGrid(gh);
  }

  gameLoop() {
    this.grid.update();
    this.gh.clear();
    this.grid.render(this.gh);
    requestAnimationFrame(() => this.gameLoop());
  }
}
