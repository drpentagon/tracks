import GraphicsHandler from "../graphicsHandler";
import Project from "./project";
import IsoGrid from "../composed/isoGrid.js";
import gtr from "../globalTranslation.js";

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
    this.grid = new IsoGrid(gh);
    gtr.zoom = 20;
  }

  gameLoop() {
    this.grid.update();
    this.gh.clear();
    this.grid.render(this.gh);
    requestAnimationFrame(() => this.gameLoop());
  }
}
