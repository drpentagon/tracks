import GraphicsHandler from "../graphicsHandler";
import PointProject from "../projects/pointProject.js";
import Point from "../primitives/point.js";
import PhysicsHandler from "../physicsHandler";

export default class AntiGravity extends PointProject {
  title: string = "ANTI GRAVITY";
  backgroundColor: string = "#4A6DE5";
  color: string = "#FFF";
  ph: PhysicsHandler;

  constructor(gh: GraphicsHandler) {
    super(gh);
    this.ph.pointAttraction = -500;
  }

  gameLoopLogic() {
    this.points.forEach((p: Point, i: number) => {
      this.ph.addSurroundingForces(p);
      for (let j: number = i + 1; j < this.points.length; j++) {
        this.ph.addPointAttraction(p, this.points[j], false);
      }
      this.ph.addFriction(p);
    });
  }
}
