import { createSlice } from '@reduxjs/toolkit'
import { INITIALIZATION, LOADING_MANIFEST, PAUSED, PLAYING, RESET, stateChange } from '../../utils/redux/constants/app'

const initialState = {
    activeState: LOADING_MANIFEST
}

const app = createSlice({
  name: 'app',
  initialState,
  reducers: {
    toNext: state => {
      const nextState = stateChange[state.activeState]
      if (nextState) state.activeState = nextState
    },
    togglePaused: state => {
      if (state.activeState === PAUSED || state.activeState === PLAYING)
        state.activeState = state.activeState === PAUSED ? PLAYING : PAUSED
    },
    toggleReset: state => {
      if (state.activeState === RESET || state.activeState === PLAYING || state.activeState === PAUSED)
        state.activeState = state.activeState === RESET ? INITIALIZATION : RESET
    },
  }
})

export const { toNext, togglePaused, toggleReset } = app.actions

export default app
