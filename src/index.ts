import GraphicsHandler from "./graphicsHandler.js";

const CONTAINER: HTMLElement = document.querySelector(".graphics-wrapper");

class Application {
  gh: GraphicsHandler;
  constructor() {
    this.gh = new GraphicsHandler(CONTAINER);
  }

  start() {}
}

const tracks: Application = new Application();
tracks.start();
