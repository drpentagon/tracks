import GraphicsHandler from "../graphicsHandler";

export default interface Project {
  backgroundColor: string;
  color: string;
  title: string;
  gh: GraphicsHandler;
  gameLoop(): void;
}
