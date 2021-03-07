import GraphicsHandler from "./graphicsHandler.js";
import Point from "./primitives/point.js";

const CONTAINER: HTMLElement = document.querySelector(".graphics-wrapper");

class Application {
  gh: GraphicsHandler;
  constructor() {
    console.log("Applicaation initialized 2");
    this.gh = new GraphicsHandler(CONTAINER);
    this.gh.strokeStyle = "rgba(0,0,0)";
  }

  start() {
    const p = new Point(100, 100);
    p.render(this.gh);
  }
}

const tracks: Application = new Application();
tracks.start();
