import { createSlice } from '@reduxjs/toolkit'
import { appStateLogic, PAUSED, PLAYING, RESET } from '../../utils/redux/constants/app'

const initialState = {
  activeState: appStateLogic[0].key,
}

const app = createSlice({
  name: 'app',
  initialState,
  reducers: {
    toNextState: state => {
      if (state.activeState === PLAYING) return
      if (state.activeState === PAUSED) return

      const curStateInd = appStateLogic.findIndex(({ key }) => key === state.activeState)

      if (curStateInd < appStateLogic.length)
        state.activeState = appStateLogic[curStateInd + 1].key
    },
    toPaused: state => {
      state.activeState = PAUSED
    },
    toPlaying: state => {
      state.activeState = PLAYING
    },
    toReset: state => {
      state.activeState = RESET
    }
  }
})

export const { toNextState, toPlaying, toPaused, toReset } = app.actions

export default app

