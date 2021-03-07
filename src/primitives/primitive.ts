import GraphicsHandler from "../graphicsHandler";

export default interface Primitive {
  color: string;
  render(gh: GraphicsHandler): void;
}
