import GraphicsHandler from "../graphicsHandler";
import Primitive from "./primitive";
import Point from "./point.js";
import gtr from "../globalTranslation.js";

export default class Cube implements Primitive {
  x: number;
  y: number;
  z: number;
  color: string;

  constructor(x: number, y: number, z: number) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  render(gh: GraphicsHandler) {
    // // const r: Number = Math.floor(Math.random() * 256);
    // // const g: Number = Math.floor(Math.random() * 256);
    // // const b: Number = Math.floor(Math.random() * 256);
    // // gh.strokeStyle = `rgba(${r},${g},${b},0.1)`;
    // gh.strokeStyle = "rgba(0,0,40,0.4)";
    // gh.drawLine(this.p1, this.p2);
  }
}
