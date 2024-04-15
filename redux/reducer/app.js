import { createSlice } from '@reduxjs/toolkit'
import { LOADING_MANIFEST, PAUSED, RESET, stateChange } from '../../utils/redux/constants/app'

const initialState = {
    activeState: LOADING_MANIFEST
}

const app = createSlice({
  name: 'app',
  initialState,
  reducers: {
    toNext: state => { state.activeState = stateChange[state.activeState] },
    toPaused: state => { state.activeState = PAUSED },
    toReset: state => { state.activeState = RESET },
  }
})

export const { toNext, toPaused, toReset, setConfig, setScene } = app.actions

export default app
