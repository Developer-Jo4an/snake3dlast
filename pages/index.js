import { gameTransitionLogic } from '../controllers/helpers/sceneInit'
import { useDispatch, useSelector } from 'react-redux'
import { LOADING, PAUSED, PLAYING, SHOWING } from '../utils/redux/constants/app'
import { toNext, toPaused } from '../redux/reducer/app'
import { useEffect, useRef } from 'react'
import GameContainer from '../components/GameContainer/GameContainer'
import GameLoader from '../components/GameLoader/GameLoader'

export default function Home() {
  const dispatch = useDispatch()
  const gameContainerRef = useRef()
  const activeState = useSelector(state => state.app.activeState)

  useEffect(() => {
    if (activeState === PLAYING) return

      (async() => {
        const callback = gameTransitionLogic[activeState]

        if (activeState !== SHOWING) {
          if (activeState === LOADING)
            await callback(gameContainerRef.current)
          else
            await callback()

          dispatch(toNext())
          return
        }

        callback()
        window.addEventListener(scene.PLAYING_MODE, toPlayingListener)
        function toPlayingListener () {
          removeEventListener(scene.PLAYING_MODE, toPlayingListener)
          dispatch(toNext())
        }
      })()
  }, [activeState])

  return (
    <div className="container">
      <GameContainer reference={gameContainerRef}/>
      <GameLoader activeState={activeState}/>
      <button
        className={'game-container__button'}
        onClick={ () => dispatch(toPaused()) }
      >{ activeState !== PAUSED ? 'paused' : 'play' }</button>

    </div>
  )
}

export async function getStaticProps() {
  return {
    props: {}
  }
}
