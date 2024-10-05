import GraphicsHandler from "../graphicsHandler";

export default interface ComposedObject {
  render(gh: GraphicsHandler): void;
}
