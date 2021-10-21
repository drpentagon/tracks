import GraphicsHandler from "./graphicsHandler.js";
import Project from "./projects/project.js";
import Repelling from "./projects/repelling.js";

const CONTAINER: HTMLElement = document.querySelector(".graphics-wrapper");

class Application {
  gh: GraphicsHandler;
  project: Project;

  constructor() {
    this.gh = new GraphicsHandler(CONTAINER);
    this.project = new Repelling(this.gh);
  }

  start() {
    this.project.gameLoop();
  }
}

const tracks: Application = new Application();
tracks.start();
