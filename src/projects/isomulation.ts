import GraphicsHandler from "../graphicsHandler.js";
import Project from "./project.js";
import IsoGrid from "../composed/isoGrid.js";
import gtr from "../globalTranslation.js";
import Point from "../primitives/point.js";
import mh from "../mouseHandler.js";
import Colors from "../colors.js";
import Cube from "../primitives/cube.js";

const STATIC_CONTAINER: HTMLElement = document.querySelector(
  ".static-graphics-wrapper"
);

let last = 0

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
  cubes: Cube[];

  constructor(gh: GraphicsHandler) {
    this.staticGraphic = new GraphicsHandler(STATIC_CONTAINER);
    this.gh = gh;
    gtr.zoom = 40;
    gtr.pan = new Point(0, 0);
    this.grid = new IsoGrid(this.staticGraphic);
    this.grid.render(this.staticGraphic);

    this.cubes = [];
    for(let x = - 5; x < 5; x++) {
      for(let y = 5; y < 11; y++) {
        for(let z = -10; z < -1; z++) {
          if(!((z >= -7 && z<= -4) && ((y > 5 && y < 10) || (x > -4 && x < 3)))) this.cubes.push(new Cube(x, y, z));
        }
      }      
    }
    this.cubes.push(new Cube(0, 10, 0));
    this.cubes.push(new Cube(0, 9, 0));
    this.cubes.push(new Cube(1, 10, 0);
    this.cubes.push(new Cube(1, 9, 0));
    this.cubes.push(new Cube(0, 7, 0));
    this.cubes.push(new Cube(1, 7, 0));
    this.cubes.push(new Cube(2, 7, 0));
    this.cubes.push(new Cube(0, 10, 1));
    this.cubes.push(new Cube(0, 9, 1));
    this.cubes.push(new Cube(1, 10, 1);
    this.cubes.push(new Cube(1, 9, 1));
    this.cubes.push(new Cube(0, 7, 1));
    this.cubes.push(new Cube(1, 7, 1));
    
    this.cubes.sort((c1, c2) => c1.x - c2.x)
    this.cubes.sort((c1, c2) => c1.y - c2.y)
    this.cubes.sort((c1, c2) => c1.z - c2.z)
    console.log(this.cubes)

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
    // const coord = this.grid.getGridPosition(mh.pos.x, mh.pos.y);
    // this.grid.fillSquare([coord[0], coord[1]], this.material, this.gh);
    // const start:number = new Date().getTime()
    // console.log("RENDER TIME", start - last)
    // last = start
    this.cubes.forEach((c) => c.render(this.gh));
    // const stop:number = new Date().getTime()
    
    requestAnimationFrame(() => this.gameLoop());
  }
}
