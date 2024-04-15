import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useRef } from 'react'
import { gameTransitionLogic } from '../utils/redux/constants/app'
import GameContainer from '../components/GameContainer/GameContainer'
import GameLoader from '../components/GameLoader/GameLoader'
import GameButtons from '../components/GameButtons/GameButtons'

export default function Home() {
  const dispatch = useDispatch()
  const gameContainerRef = useRef()
  const activeState = useSelector(state => state.app.activeState)

  useEffect(() => { gameTransitionLogic(activeState, gameContainerRef.current, dispatch) }, [activeState])

  return (
    <div className="container">
      <GameContainer reference={ gameContainerRef }/>
      <GameLoader />
      <GameButtons />
    </div>
  )
}

export async function getStaticProps() {
  return {
    props: {}
  }
}
