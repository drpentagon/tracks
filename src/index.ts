import GraphicsHandler from "./graphicsHandler.js";

const CONTAINER: HTMLElement = document.querySelector(".graphics-wrapper");

class Application {
  gh: GraphicsHandler;
  constructor() {
    console.log("Applicaation initialized 2");
    this.gh = new GraphicsHandler(CONTAINER);
    this.gh.strokeStyle = "rgba(0,0,0)";
  }

  start() {
    this.gh.drawLine(-100, -100, 100, 100);
  }
}

const tracks: Application = new Application();
tracks.start();
