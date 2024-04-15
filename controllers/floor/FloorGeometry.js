import { FLOOR_HEIGHT, FLOOR_WIDTH } from '../constants/floorConstants'

let instance = null
export class FloorGeometry extends THREE.PlaneGeometry {
  constructor() {
    if (instance) return instance

    super(FLOOR_WIDTH, FLOOR_HEIGHT)

    instance = this

  }
}
