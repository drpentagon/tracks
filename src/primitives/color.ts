export default class Color {
  r: number;
  g: number;
  b: number;
  id: string;
  name: string;

  constructor(id: string, name: string, r: number, g: number, b: number) {
    this.id = id;
    this.name = name;
    this.r = r;
    this.g = g;
    this.b = b;
  }

  isLight(): boolean {
    return 0.299 * this.r + 0.587 * this.g + 0.114 * this.b > 128;
  }
}
