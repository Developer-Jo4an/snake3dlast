import { BODY_CHUNK_HEIGHT, BODY_CHUNK_RADIUS } from '../constants/bodyContstants'

let instance = null

export class BodyGeometry extends THREE.CylinderGeometry {
  constructor() {
    if (instance) return instance

    super(BODY_CHUNK_RADIUS, BODY_CHUNK_RADIUS, BODY_CHUNK_HEIGHT)

    instance = null

    this.translate(0, BODY_CHUNK_HEIGHT * 0.5, 0)
    this.rotateX(Math.PI * 0.5)
  }
}
