import gtr from "./globalTranslation.js";
import LineSegment from "./primitives/lineSegment.js";
import Point from "./primitives/point.js";
import { getDistanceFromLine, getLineOffset } from "./mathHelper.js";

const DIMENSIONS: [number, number, number] = [0, 1, 2];
const GRID_AXES: LineSegment[] = DIMENSIONS.map((d) => {
  const angle: number = -Math.PI / 6 + (d * Math.PI) / 3;
  const dy = Math.tan(angle);
  return new LineSegment(
    new Point(0, 0),
    dy > 1000000 ? new Point(0, -100) : new Point(100, -dy * 100)
  );
});

function getGridAxes(): LineSegment[] {
  return GRID_AXES;
}

function getGridLine(offset: number, dimension: number): LineSegment {
  if (DIMENSIONS.indexOf(dimension) < 0) return null;
  return getLineOffset(GRID_AXES[dimension], offset);
}

function getGridPosition(x: number, y: number): [number, number, number] {
  return GRID_AXES.map(
    (center) => -Math.floor(getDistanceFromLine(center, gtr.toGlobal(x, y)))
  );
}

export { getGridLine, getGridPosition, getGridAxes };
