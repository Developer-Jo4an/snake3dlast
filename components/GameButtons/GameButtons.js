import { togglePaused, toggleReset } from '../../redux/reducer/app'
import { useDispatch, useSelector } from 'react-redux'
import { PAUSED, RESET } from '../../utils/redux/constants/app'

const GameButtons = () => {
  const dispatch = useDispatch()
  const activeState = useSelector(state => state.app.activeState)

    return (
    <div className={ 'game-container__buttons' }>
      <button
        className={ 'game-container__button' }
        onClick={ () => dispatch(togglePaused()) }
      >{ activeState !== PAUSED ? 'pause' : 'play' }</button>
      <button
        className={ 'game-container__button' }
        onClick={ () => dispatch(toggleReset()) }
      >{ activeState !== RESET ? 'reset' : 'setup' }</button>
    </div>
  )
}

export default GameButtons
