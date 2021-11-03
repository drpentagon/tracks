import GraphicsHandler from "./graphicsHandler.js";
import Project from "./projects/project.js";
import Repelling from "./projects/repelling.js";
import Gravity from "./projects/gravity.js";

const CONTAINER: HTMLElement = document.querySelector(".graphics-wrapper");

class Application {
  gh: GraphicsHandler;
  project: Project;

  constructor() {
    this.gh = new GraphicsHandler(CONTAINER);
    this.project = new Repelling(this.gh);
    CONTAINER.style.backgroundColor = this.project.backgroundColor;
    document.title = this.project.title || document.title;
  }

  start() {
    this.project.gameLoop();
  }
}

const tracks: Application = new Application();
tracks.start();
