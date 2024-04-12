import { ASSETS, SKIN } from '../constants/assetsConstants'

let instance = null

export class BodyMaterial extends THREE.MeshBasicMaterial {
	constructor() {
		if (instance) return instance

    super({ map: ASSETS.find(({ name }) => name === SKIN).texture })

		instance = this
	}
}
