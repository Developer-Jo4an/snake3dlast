import {
  INITIALIZATION,
  LOADING,
  LOADING_COMPLETE,
  LOADING_MANIFEST,
  PAUSED,
  SHOWING
} from '../../utils/redux/constants/app'

export const gameTransitionLogic = {
  [LOADING_MANIFEST]: async () => window.gameConfig = await import('/manifest.json'),
  [LOADING]: async container => {
    window.THREE = await import('three')
    window.textures = {}

    const { assets } = gameConfig.config
    const textureLoader = new THREE.TextureLoader()
    for (const key in assets)
      window.textures[key] = await new Promise(
        resolve => textureLoader.load(assets[key], resolve)
      )

    const { SceneInit } = await import('/controllers/scene/SceneInit')
    window.scene = new SceneInit(container)
  },
  [LOADING_COMPLETE]: () => console.log('Loading Complete'),
  [INITIALIZATION]: () => window.scene.initialization(),
  [SHOWING]: () => window.scene.showing(),
  [PAUSED]: () => window.scene.paused()
}
