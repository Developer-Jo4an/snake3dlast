import { useEffect, useRef, } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { appStateLogic, LOADING, PAUSED, PLAYING } from '../utils/redux/constants/app'
import { toNextState } from '../redux/reducer/app'
import GamePreloader from '../components/gamePreloader/GamePreloader'
import GameContainer from '../components/gameContainer/GameContainer'

export default function Home() {
  const dispatch = useDispatch()
  const activeState = useSelector(state => state.app.activeState)
  const curStateLogic = appStateLogic.find(({ key }) => key === activeState)

  const containerRef = useRef()

  useEffect(() => {
    (async () => {
      const { callback } = curStateLogic

      if (activeState === LOADING) {
        await callback(containerRef.current)
      } else if (activeState === PAUSED) {
        window.controller.pause()
      } else if (activeState === PLAYING) {
        window.controller.play()
      } else {
        if (callback)
          await callback()
      }

      dispatch(toNextState())
    })()
  }, [activeState])

  return (
    <div className="container">
      <GameContainer reference={ containerRef } />
      <GamePreloader activeState={ activeState } />
    </div>
  )
}

export async function getStaticProps() {
  return {
    props: {},
  }
}
