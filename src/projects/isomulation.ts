import GraphicsHandler from "../graphicsHandler.js";
import Project from "./project.js";
import IsoGrid from "../composed/isoGrid.js";
import Scene from "../composed/scene.js";
import gtr from "../globalTranslation.js";
import Point from "../primitives/point.js";
import mh from "../mouseHandler.js";
import Cube from "../primitives/cube.js";
import { getGridPosition } from "../gridMath.js";
import GridPosition from "../composed/gridPosition.js";

const STATIC_CONTAINER: HTMLElement = document.querySelector(
  ".static-graphics-wrapper"
);

export default class Isomulation implements Project {
  backgroundColor: string = "#FFFF";
  color: string = "#600";
  title: string = "ISOMULATION";
  gh: GraphicsHandler;
  staticGraphic: GraphicsHandler;
  now: number;
  then: number;
  grid: IsoGrid;
  panStart: Point;
  scene: Scene;
  clickStart: number;

  constructor(gh: GraphicsHandler) {
    this.staticGraphic = new GraphicsHandler(STATIC_CONTAINER);
    this.gh = gh;
    gtr.zoom = 30;
    gtr.pan = new Point(0, 0);
    this.grid = new IsoGrid(this.staticGraphic);
    this.grid.render(this.staticGraphic);
    this.scene = new Scene();

    for (let x = -5; x < 5; x++) {
      for (let y = 0; y < 11; y++) {
        for (let z = -10; z < 0; z++) {
          if (
            !(z >= -7 && z <= -4 && ((y > 5 && y < 10) || (x > -4 && x < 3)))
          ) {
            this.scene.addCube(new Cube(x, y, z));
          }
        }
      }
    }
    this.scene.addCube(new Cube(0, 10, 0));
    this.scene.addCube(new Cube(0, 9, 0));
    this.scene.addCube(new Cube(1, 10, 0));
    this.scene.addCube(new Cube(1, 9, 0));
    this.scene.addCube(new Cube(0, 7, 0));
    this.scene.addCube(new Cube(1, 7, 0));
    this.scene.addCube(new Cube(2, 7, 0));
    this.scene.addCube(new Cube(0, 10, 1));
    this.scene.addCube(new Cube(0, 9, 1));
    this.scene.addCube(new Cube(1, 10, 1));
    this.scene.addCube(new Cube(1, 9, 1));
    this.scene.addCube(new Cube(0, 7, 1));
    this.scene.addCube(new Cube(1, 7, 1));

    window.onresize = () => {
      this.gh.updateSize();
      this.staticGraphic.updateSize();
      this.grid.setViewport(this.staticGraphic);
      this.staticGraphic.clear();
      this.grid.render(this.staticGraphic);
    };

    window.addEventListener("touchstart", (e) => {
      this.panStart = new Point(e.touches[0].clientX, e.touches[0].clientY);
    });

    window.addEventListener("touchmove", (e) => {
      const p: Point = new Point(e.touches[0].clientX, e.touches[0].clientY);
      this.updatePanPosition(p.x - this.panStart.x, p.y - this.panStart.y);
      this.panStart = p;
    });

    window.addEventListener("wheel", (e) =>
      this.updatePanPosition(-e.deltaX, -e.deltaY)
    );

    window.addEventListener("mousedown", (e) => {
      this.clickStart = new Date().getTime();
    });

    window.addEventListener("click", (e) => {
      const erase = new Date().getTime() - this.clickStart > 350;

      const pos: GridPosition = this.scene.getCube(
        ...getGridPosition(mh.pos.x, mh.pos.y)
      );

      if (pos) {
        if (erase) {
          this.scene.removeCube(pos.cube);
        } else {
          let cube: Cube;
          switch (pos.shade) {
            case "color":
              cube = new Cube(pos.cube.x, pos.cube.y + 1, pos.cube.z);
              break;
            case "shadow":
              cube = new Cube(pos.cube.x + 1, pos.cube.y, pos.cube.z);
              break;
            case "highlight":
              cube = new Cube(pos.cube.x, pos.cube.y, pos.cube.z + 1);
              break;
          }
          this.scene.addCube(cube);
        }
      }
    });
  }

  updatePanPosition(dX: number, dY: number): void {
    gtr.pan.x += dX / gtr.zoom;
    gtr.pan.y += dY / gtr.zoom;

    this.staticGraphic.clear();
    this.grid.setViewport(this.staticGraphic);
    this.grid.render(this.staticGraphic);
  }

  gameLoop() {
    this.gh.clear();
    this.scene.render(this.gh);
    requestAnimationFrame(() => this.gameLoop());
  }
}
