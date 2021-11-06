import GraphicsHandler from "./graphicsHandler.js";
import Project from "./projects/project.js";
import AntiGravity from "./projects/antiGravity.js";
import Fillet from "./projects/fillet.js";
import Gravity from "./projects/gravity.js";

const PROJECTS: any = {
  gravity: Gravity,
  antigravity: AntiGravity,
  borderradius: Fillet,
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
  }

  start() {
    this.project.gameLoop();
  }
}

const tracks: Application = new Application("gravity");
tracks.start();
