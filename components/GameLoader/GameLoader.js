import { PAUSED, PLAYING, RESET, SHOWING } from '../../utils/redux/constants/app'

const GameLoader = ({ activeState }) => {

  return

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
