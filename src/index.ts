import GraphicsHandler from "./graphicsHandler.js";
import Project from "./projects/project.js";
import Fillet from "./projects/fillet.js";

const CONTAINER: HTMLElement = document.querySelector(".graphics-wrapper");

class Application {
  gh: GraphicsHandler;
  project: Project;

  constructor() {
    this.gh = new GraphicsHandler(CONTAINER);
    this.project = new Fillet(this.gh);
  }

  start() {
    this.project.setup();
    this.project.gameLoop();
  }
}

const tracks: Application = new Application();
tracks.start();
