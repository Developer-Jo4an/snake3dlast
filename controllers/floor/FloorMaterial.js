import { FLOOR_HEIGHT, FLOOR_WIDTH } from '../constants/floorConstants'

let instance = null

export class FloorMaterial extends THREE.MeshBasicMaterial {
  constructor() {
    if (instance) return instance

    super({ map: gameData.textures.floor })

    instance = this

    this.map.wrapS = THREE.RepeatWrapping
    this.map.wrapT = THREE.RepeatWrapping
    this.map.repeat.set(FLOOR_WIDTH, FLOOR_HEIGHT)
    this.map.magFilter = THREE.NearestFilter
  }
}
