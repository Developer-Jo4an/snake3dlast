import { useEffect, useMemo, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { INITIALIZATION, LOADING, LOADING_COMPLETE, LOADING_MANIFEST, SHOWING } from '../utils/redux/constants/app'
import { toNext } from '../redux/reducer/app'
import GameContainer from '../components/GameContainer/GameContainer'
import GameLoader from '../components/GameLoader/GameLoader'

export default function Home() {
  const dispatch = useDispatch()
  const gameContainerRef = useRef()
  const activeState = useSelector(state => state.app.activeState)

  const gameStateLogic = useMemo(() => ({
    async [LOADING_MANIFEST]() {
      window.gameConfig = await import('/manifest.json')
    },
    async [LOADING]() {
      window.THREE = await import('three')
      window.textures = {}

      const { assets } = gameConfig.config
      const textureLoader = new THREE.TextureLoader()
      for (const key in assets) {
        window.textures[key] = await new Promise(resolve =>
          textureLoader.load(assets[key], resolve)
        )
      }
      const { SceneInit } = await import('/controllers/scene/SceneInit')
      window.scene = new SceneInit(gameContainerRef.current)
    },
    [LOADING_COMPLETE]() {
      console.log('Loading Complete')
    },
    [INITIALIZATION]() {
      window.scene.activate()
    },
    [SHOWING]() {
      window.scene.showing()
    }
  }), [])

  useEffect(() => {
    (async() => {
      const callback = gameStateLogic[activeState]
      if (callback) await callback()
      dispatch(toNext())
    })()
  }, [activeState])

  return (
    <div className="container">
      <GameContainer reference={ gameContainerRef } />
      <GameLoader activeState={ activeState } />
    </div>
  )
}

export async function getStaticProps() {
  return {
    props: {},
  }
}
