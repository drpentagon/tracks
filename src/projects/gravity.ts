import GraphicsHandler from "../graphicsHandler";
import PointProject from "../projects/pointProject.js";
import Point from "../primitives/point.js";
import PhysicsHandler from "../physicsHandler";

export default class Gravity extends PointProject {
  title: string = "GRAVITYS";
  backgroundColor: string = "#000";
  color: string = "#FFF";
  ph: PhysicsHandler;

  constructor(gh: GraphicsHandler) {
    super(gh);
  }

  gameLoopLogic() {
    this.points.forEach((p: Point, i: number) => {
      for (let j: number = i + 1; j < this.points.length; j++) {
        this.ph.addPointAttraction(p, this.points[j]);
      }
    });
  }
}
