import ComposedObject from "./composedObject";
import GraphicsHandler from "../graphicsHandler";
import Cube from "../primitives/cube.js";
import GridPosition from "./gridPosition.js";

export default class Scene implements ComposedObject {
  positions;
  cubes: Cube[];

  constructor() {
    this.positions = {};
    this.cubes = [];
  }

  addCube(cube: Cube): void {
    this.cubes.push(cube);
    this.addCubePositions(cube);
  }

  addCubePositions(cube: Cube): void {
    this.addPosition(cube.a, cube.b, cube.c + 1, cube, 1);
    this.addPosition(cube.a, cube.b, cube.c, cube, 1);
    this.addPosition(cube.a + 1, cube.b, cube.c, cube, 2);
    this.addPosition(cube.a + 1, cube.b + 1, cube.c, cube, 2);
    this.addPosition(cube.a + 1, cube.b + 1, cube.c + 1, cube, 0);
    this.addPosition(cube.a, cube.b + 1, cube.c + 1, cube, 0);
  }

  addPosition(a: number, b: number, c: number, cube: Cube, side: number): void {
    if (!this.positions[a]) this.positions[a] = {};
    if (!this.positions[a][b]) this.positions[a][b] = {};
    if (
      !this.positions[a][b][c] ||
      this.positions[a][b][c].cube.isBehind(cube)
    ) {
      this.positions[a][b][c] = new GridPosition([a, b, c], cube, side);
    }
  }

  removeCube(cube: Cube): void {
    this.positions = {};
    this.cubes = this.cubes.filter((c) => c !== cube);
    this.cubes.forEach((c) => this.addCubePositions(c));
  }

  getCube(a: number, b: number, c: number): GridPosition {
    return (
      this.positions[a] &&
      this.positions[a][b] &&
      this.positions[a][b][c] &&
      this.positions[a][b][c]
    );
  }

  render(gh: GraphicsHandler) {
    Object.keys(this.positions).forEach((a) => {
      Object.keys(this.positions[a]).forEach((b) => {
        Object.keys(this.positions[a][b]).forEach((c) => {
          this.positions[a][b][c].render(gh);
        });
      });
    });
  }
}
