import { ASSETS, FLOOR } from '../constants/assetsConstants'
import { FLOOR_HEIGHT, FLOOR_WIDTH } from '../constants/floorConstants'

export class FloorMaterial extends THREE.MeshBasicMaterial{
    constructor() {
      super({ map: ASSETS.find(({ name }) => name === FLOOR).texture })

        this.map.wrapS = THREE.RepeatWrapping
        this.map.wrapT = THREE.RepeatWrapping
        this.map.repeat.set(FLOOR_WIDTH, FLOOR_HEIGHT)
        this.map.magFilter = THREE.NearestFilter
    }
}
