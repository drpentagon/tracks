import GraphicsHandler from "../graphicsHandler";

export default interface Project {
  gh: GraphicsHandler;
  gameLoop(): void;
}
