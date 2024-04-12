import { FLOOR_HEIGHT, FLOOR_WIDTH } from '../constants/floorConstants'

export class FloorGeometry extends THREE.PlaneGeometry {
    constructor() {
        super(FLOOR_WIDTH, FLOOR_HEIGHT)
    }
}
