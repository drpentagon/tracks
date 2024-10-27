import GraphicsHandler from "../graphicsHandler";
import Primitive from "./primitive";
import Point from "./point.js";
import { getGridLine } from "../gridMath.js";
import { getLinesIntersection } from "../mathHelper.js";
import Materials from "../materials.js";
import Material from "./material";

export default class Cube implements Primitive {
  x: number;
  y: number;
  z: number;
  material: Material;
  color: string;

  constructor(
    x: number,
    y: number,
    z: number,
    material: Material = Materials.getMaterial("Light gray")
  ) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.material = material;
  }

  render(gh: GraphicsHandler) {
    const x = this.x - this.z;
    const y = this.y - this.z;
    const bounds = [x, y]
      .map((c, d) => [getGridLine(c, d), getGridLine(c - 1, d)])
      .reduce((arr, c) => {
        arr.push(c[0]);
        arr.push(c[1]);
        return arr;
      }, []);

    const top: Point[] = [
      getLinesIntersection(bounds[0], bounds[2]),
      getLinesIntersection(bounds[2], bounds[1]),
      getLinesIntersection(bounds[1], bounds[3]),
      getLinesIntersection(bounds[3], bounds[0]),
    ];

    const d = top[2].y - top[0].y;
    const bottom = top.map((p) => new Point(p.x, p.y - d));
    const left = [top[3], top[0], bottom[0], bottom[3]];
    const right = [top[0], top[1], bottom[1], bottom[0]];

    gh.strokeStyle = "rgba(0,0,0,0.2)";
    gh.fillStyle = this.material.highlight.rgba;
    gh.drawPolygon(top, true);
    gh.drawPolygon(top);
    gh.fillStyle = this.material.shadow.rgba;
    gh.drawPolygon(left, true);
    gh.drawPolygon(left);
    gh.fillStyle = this.material.color.rgba;
    gh.drawPolygon(right, true);
    gh.drawPolygon(right);
  }
}
