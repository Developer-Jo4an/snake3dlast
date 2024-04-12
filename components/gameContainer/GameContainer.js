import { useDispatch } from 'react-redux'
import { toPaused, toPlaying, toReset } from '../../redux/reducer/app'

const GameContainer = ({ reference }) => {
  const dispatch = useDispatch()

  return (
    <div className={ 'game-container' } ref={ reference }>
      <div className={ 'game-container__buttons' }>
        <button className={ 'game-container__button' } onClick={ () => dispatch(toPaused()) }>Pause</button>
        <button className={ 'game-container__button' } onClick={ () => dispatch(toPlaying()) }>Play</button>
        <button className={ 'game-container__button' } onClick={ () => dispatch(toReset()) }>Reset</button>
      </div>
    </div>
  )
}

export default GameContainer
