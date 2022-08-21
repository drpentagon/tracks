import GraphicsHandler from "../graphicsHandler";
import Project from "./project";

export default class Isomulation implements Project {
  backgroundColor: string = "#DDD";
  color: string = "#600";
  title: string = "ISOMULATION";
  gh: GraphicsHandler;
  now: number;
  then: number;

  constructor(gh: GraphicsHandler) {
    this.gh = gh;
  }

  gameLoop() {}
}
