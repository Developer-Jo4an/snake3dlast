import { ASSETS } from '../constants/assetsConstants'
import { loadTextures } from '../helpers/loadeTextures'

export const setupAll = async container => {
  window.THREE = await import('three')
  window.texturesLoader = new THREE.TextureLoader()

  for (let i = 0; i < ASSETS.length; i++)
    ASSETS[i].texture = await loadTextures(ASSETS[i].src)

  const { SceneInit } = await import('../scene/SceneInit')
  window.controller = new SceneInit(container)
}
