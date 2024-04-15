import { PAUSED, PLAYING, RESET, SHOWING } from '../../utils/redux/constants/app'
import { useSelector } from 'react-redux'

const GameLoader = () => {
  const activeState = useSelector(state => state.app.activeState)

  if (
    activeState === SHOWING ||
    activeState === PLAYING ||
    activeState === PAUSED ||
    activeState === RESET
  ) return

  return (
    <div className={ 'game-loader' }>
      <div className={ 'game-loader__spinner' }></div>
      <p className={ 'game-loader__status' }>Loading</p>
    </div>
  )
}

export default GameLoader
