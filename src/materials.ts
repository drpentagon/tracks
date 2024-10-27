import Material from "./primitives/material.js";

class Materials {
  materials: Material[];

  constructor() {
    this.materials = [new Material("Light gray", "b29", "b18", "b99")];
  }

  getMaterial(name: string): Material {
    return this.materials.find((m) => m.name === name) || this.materials[0];
  }
}

export default new Materials();
