import { loadTexture } from '../../../controllers/helpers/loadTexture'
import { toNext } from '../../../redux/reducer/app'

export const LOADING_MANIFEST = 'loadingManifest'
export const LOADING = 'loading'
export const LOADING_COMPLETE = 'loadingComplete'
export const INITIALIZATION = 'initialization'
export const SHOWING = 'showing'
export const PLAYING = 'playing'
export const PAUSED = 'paused'
export const RESET = 'reset'

export const stateChange = {
  [LOADING_MANIFEST]: LOADING,
  [LOADING]: LOADING_COMPLETE,
  [LOADING_COMPLETE]: INITIALIZATION,
  [INITIALIZATION]: SHOWING,
  [SHOWING]: PLAYING
}

const gameTransitionLogicObject = {
  [LOADING_MANIFEST]: async () => {
    window.gameData = {}
    window.gameData.gameConfig = await import('/manifest.json')
  },
  [LOADING]: async container => {
    window.THREE = await import('three')
    gameData.textureLoader = new THREE.TextureLoader()
    gameData.textures = {}

    const { assets } = gameData.gameConfig.config
    for (const key in assets) gameData.textures[key] = await loadTexture(assets[key])

    const { SceneInit } = await import('/controllers/scene/SceneInit')
    gameData.scene = new SceneInit(container)
  },
  [LOADING_COMPLETE]: () => { console.log('loading complete') },
  [INITIALIZATION]: () => gameData.scene.initialization(),
  [SHOWING]: dispatch => {
    window.addEventListener(gameData.scene.PLAYING_MODE, toPlayingListener)
    function toPlayingListener() {
      window.removeEventListener(gameData.scene.PLAYING_MODE, toPlayingListener)
      dispatch(toNext())
    }
    gameData.scene.showing()
  },
  [PAUSED]: () => gameData.scene.paused(),
  [PLAYING]: () => gameData.scene.playing(),
  [RESET]: () => gameData.scene.reset()
}

export const gameTransitionLogic = async (key, container, dispatch) => {
  const callback = gameTransitionLogicObject[key]

  if (key === LOADING)
    await callback(container)
  else if (key === SHOWING) {
    await callback(dispatch)
    return
  }
  else await callback()

  dispatch(toNext())
}
