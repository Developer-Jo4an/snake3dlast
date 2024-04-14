import { FloorGeometry } from './FloorGeometry'
import { FloorMaterial } from './FloorMaterial'

export class Floor extends THREE.Mesh {
  constructor() {
    super(new FloorGeometry(), new FloorMaterial())

    this.rotation.x = -Math.PI * 0.5
  }
}
