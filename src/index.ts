import GraphicsHandler from "./graphicsHandler.js";
import Project from "./projects/project.js";
import AntiGravity from "./projects/antiGravity.js";
import Fillet from "./projects/fillet.js";
import Gravity from "./projects/gravity.js";
import Squared from "./projects/squared.js";
import Tetris from "./projects/tetris.js";
import LineIntersections from "./projects/lineIntersections.js";
import Isomulation from "./projects/isomulation.js";

const PROJECTS: any = {
  gravity: Gravity,
  antigravity: AntiGravity,
  borderradius: Fillet,
  lineIntersections: LineIntersections,
  squared: Squared,
  tetris: Tetris,
  isomulation: Isomulation,
};

const CONTAINER: HTMLElement = document.querySelector(".graphics-wrapper");

class Application {
  gh: GraphicsHandler;
  project: Project;

  constructor(type: string) {
    this.gh = new GraphicsHandler(CONTAINER);
    this.project = new PROJECTS[type](this.gh);
    CONTAINER.style.backgroundColor = this.project.backgroundColor;
    document.title = this.project.title || document.title;
    window.onresize = () => this.gh.updateSize();
  }

  start() {
    this.project.gameLoop();
  }
}

const tracks: Application = new Application("isomulation");
tracks.start();
