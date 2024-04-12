import { HEAD_COLOR, HEAD_RADIUS } from '../constants/headConstants'

export class Head extends THREE.Mesh {
    constructor() {
	    const geometry = new THREE.SphereGeometry(HEAD_RADIUS)

	    const material = new THREE.MeshBasicMaterial({ color: HEAD_COLOR })

	    super(geometry, material)

	    this.position.y = 1
    }
}
