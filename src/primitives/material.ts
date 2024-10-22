import Colors from "../colors.js";
import Color from "./color.js";

export default class Material {
  name: string;
  color: Color;
  highlight: Color;
  shadow: Color;

  constructor(name: string, color: string, highlight: string, shadow: string) {
    this.name = name;
    this.color = Colors.getColor(color);
    this.highlight = Colors.getColor(highlight);
    this.shadow = Colors.getColor(shadow);
  }
}
