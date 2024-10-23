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
    this.initDialog();
    this.initialized = true;
  }

  initDialog(): void {
    const dialog = document.querySelector(".dialog__color-picker");
    this.colors.forEach((c: Color) => {
      const div = document.createElement("div");
      div.classList.add("color__wrapper");
      c.isLight() && div.classList.add("color__wrapper--inverted");
      div.style.backgroundColor = c.rgba;

      const id = document.createElement("h1");
      id.innerText = c.id;
      id.classList.add("color__id");

      const name = document.createElement("label");
      name.innerText = c.name;
      name.classList.add("color__name");

      div.appendChild(id);
      div.appendChild(name);
      dialog.appendChild(div);
    });
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
