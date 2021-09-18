import GraphicsHandler from "../graphicsHandler";

export default interface Project {
  gh: GraphicsHandler;
  setup(): void;
  gameLoop(): void;
}
