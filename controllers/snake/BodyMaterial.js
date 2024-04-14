let instance = null

export class BodyMaterial extends THREE.MeshBasicMaterial {
  constructor() {
    if (instance) return instance

    super({ map: textures.skin })

    instance = this
  }
}
