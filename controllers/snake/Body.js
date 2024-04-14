import { BodyGeometry } from './BodyGeometry'
import { BodyMaterial } from './BodyMaterial'
import { BODY_CHUNK_HEIGHT } from '../constants/bodyContstants'

export class Body extends THREE.Mesh {
  constructor(x) {
    super(new BodyGeometry(), new BodyMaterial())

    this.rotation.y = -Math.PI * 0.5
    this.position.set(x * BODY_CHUNK_HEIGHT, 1, 0)
  }
}
