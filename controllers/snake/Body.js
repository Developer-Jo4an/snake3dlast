import { BODY_CHUNK_HEIGHT } from '../constants/bodyContstants'
import { BodyMaterial } from './BodyMaterial'
import { BodyGeometry } from './BodyGeometry'

export class Body extends THREE.Mesh {
    constructor(x) {
        super(new BodyGeometry(), new BodyMaterial())

	    this.rotation.y = -Math.PI * 0.5
        this.position.set(x * BODY_CHUNK_HEIGHT, 1, 0)
    }
}
