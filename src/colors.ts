import Color from "./primitives/color.js";
import copic from "./resources/copic.js";

class Colors {
  colors: Color[];
  initialized: boolean;

  initialize(): void {
    if (this.initialized) return;
    this.colors = [];

    copic
      .map((s) => s.colors)
      .reduce((arr, colors) => {
        arr.push(...colors);
        return arr;
      }, [])
      .forEach((c) => {
        const rgb = hexToRgb(c.color);
        this.colors.push(new Color(c.id, c.name, rgb.r, rgb.g, rgb.b));
      });

    this.initialized = true;
  }

  getColor(id: string): Color {
    return this.colors.find((c) => c.id === id);
  }
}

const hexToRgb = (hex: string): { r: number; g: number; b: number } => {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

export default new Colors();
