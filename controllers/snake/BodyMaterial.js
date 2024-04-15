let instance = null

export class BodyMaterial extends THREE.MeshBasicMaterial {
  constructor() {
    if (instance) return instance

    super({ map: gameData.textures.skin })

    instance = this
  }
}
