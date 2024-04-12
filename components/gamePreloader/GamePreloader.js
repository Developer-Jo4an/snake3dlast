import { appStateLogic, PAUSED, PLAYING, RESET, SHOWING } from '../../utils/redux/constants/app'

const GamePreloader = ({ activeState }) => {
  if (
    activeState === RESET   ||
    activeState === PAUSED  ||
    activeState === PLAYING ||
    activeState === SHOWING
  ) return

  const title = appStateLogic.find(({ key }) => key === activeState).label

  return (
    <div className={ 'game-preloader' }>
      <div className={ 'game-preloader__spinner' }></div>
      { title && <p className={ 'game-preloader__title' }>{ title }</p> }
    </div>
  )
}

export default GamePreloader
