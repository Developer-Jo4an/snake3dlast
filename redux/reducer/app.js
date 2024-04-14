import { createSlice } from '@reduxjs/toolkit'
import { INITIALIZATION, LOADING, LOADING_COMPLETE, LOADING_MANIFEST, PAUSED, PLAYING, RESET, SHOWING } from '../../utils/redux/constants/app'

const initialState = {
    activeState: LOADING_MANIFEST
}

const stateChange = prevState => {
  const stateChangeLogic = {
    [LOADING_MANIFEST]: LOADING,
    [LOADING]: LOADING_COMPLETE,
    [LOADING_COMPLETE]: INITIALIZATION,
    [INITIALIZATION]: SHOWING,
    [SHOWING]: PLAYING,
  }
  return stateChangeLogic[prevState]
}

const app = createSlice({
  name: 'app',
  initialState,
  reducers: {
    toNext: state => { state.activeState = stateChange(state.activeState) },
    toPaused: state => { state.activeState = PAUSED },
    toReset: state => { state.activeState = RESET },
  }
})

export const { toNext, toPaused, toReset, setConfig, setScene } = app.actions

export default app
